import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { Product } from '@food-shop-architecture-workshop/core/model';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../../../store/app-state.module';
import { isProductToFavorite } from '../../../favorite/store/favorite.selectors';
import { FavoriteActions } from '../../../favorite/store/favorite.actions';
import { CartActions } from '../../../cart/store/cart.actions';

@Component({
  selector: 'app-product-details-overlay',
  templateUrl: 'product-details-overlay.component.html',
})
export class ProductDetailsOverlayComponent {
  product: Product;
  isFavoriteProduct$: Observable<boolean>;
  numberOfServing: number;
  matSnackbarRef!: MatSnackBarRef<any>;

  @ViewChild('templatePortalContent') templatePortalContent!: TemplateRef<any>;

  constructor(
    public dialogRef: MatDialogRef<ProductDetailsOverlayComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { product: Product; numberOfServings: number },
    private snackBar: MatSnackBar,
    private store: Store<ApplicationState>
  ) {
    this.product = data.product;
    this.numberOfServing = data.numberOfServings;

    this.isFavoriteProduct$ = this.store.select(isProductToFavorite(data.product.id));
  }

  closeDialog() {
    this.dialogRef.close();
  }

  handleAddToBag(item: { product: Product; quantity: number }) {
    this.store.dispatch(CartActions.addProductToCart({ productOrder: item }));

    this.dialogRef.close();
    this.matSnackbarRef = this.snackBar.openFromTemplate(this.templatePortalContent, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      data: item.product,
      duration: 4000,
      panelClass: 'custom-snackbar',
    });
  }

  handleFavoriteChanged(payload: { product: Product; favorite: boolean }) {
    if (payload.favorite) {
      this.store.dispatch(FavoriteActions.addProductToFavorite({ product: payload.product }));
    } else {
      this.store.dispatch(FavoriteActions.removeProductFromFavorite({ product: payload.product }));
    }
  }
}
