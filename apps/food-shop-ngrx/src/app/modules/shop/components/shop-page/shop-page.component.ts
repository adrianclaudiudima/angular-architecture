import { Component, TemplateRef, ViewChild } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ShopState } from '../../store/shop-state.model';
import { MatDialog } from '@angular/material/dialog';
import { CategorySummary, Product, ProductType } from '@food-shop-architecture-workshop/core/model';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../../../store/app-state.module';
import { ShopActions } from '../../store/shop.actions';
import { getShopStateWithProductsFiltered } from '../../store/shop.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsOverlayComponent } from '../product-details-overlay/product-details-overlay.component';
import { CartActions } from '../../../cart/store/cart.actions';

@Component({
  selector: 'app-shop-page',
  templateUrl: 'shop-page.component.html',
})
export class ShopPageComponent {
  shopState$: Observable<ShopState>;
  matSnackbarRef: MatSnackBarRef<any> | undefined;
  @ViewChild('templatePortalContent')
  templatePortalContent!: TemplateRef<any>;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private store: Store<ApplicationState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.store.dispatch(ShopActions.loadProductsAndCategories());
    this.shopState$ = this.activatedRoute.queryParamMap.pipe(
      map((v) => v.get('filter')),
      tap((v) => {
        this.store.dispatch(ShopActions.filterProducts({ productType: v === null ? undefined : (v as ProductType) }));
      }),
      switchMap(() => this.store.select(getShopStateWithProductsFiltered))
    );
  }

  handleAddToBag(product: Product) {
    this.store.dispatch(CartActions.addProductToCart({ productOrder: { product: product, quantity: 1 } }));
  }

  filterProducts(filterType: CategorySummary | undefined) {
    this.router.navigate(['/'], { queryParams: { filter: filterType?.type } });
    //this.store.dispatch(ShopActions.filterProducts({ productType: filterType?.type }));
  }

  showProductDetails(product: Product) {
    this.dialog.open(ProductDetailsOverlayComponent, {
      width: '100%',
      maxWidth: '584px',
      maxHeight: '90vh',
      panelClass: 'no-padding-dialog',
      data: {
        product,
        numberOfServings: 1,
      },
    });
  }
}
