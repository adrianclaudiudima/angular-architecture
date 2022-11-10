import { Component } from '@angular/core';
import { DomainEntity, Product, ProductOrder } from '@food-shop-architecture-workshop/core/model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../../../store/app-state.module';
import { getAllFavoriteProducts } from '../../../favorite/store/favorite.selectors';
import { FavoriteActions } from '../../../favorite/store/favorite.actions';
import { getAllProductsInCartWithTotalQuantity } from '../../../cart/store/cart.selectors';
import { CartActions } from '../../../cart/store/cart.actions';
import { Router } from '@angular/router';
import { getOrdersTotalCount } from '../../store/shop.selectors';
import { ShopActions } from '../../store/shop.actions';

@Component({
  selector: 'app-shop-widgets',
  templateUrl: 'shop-widgets.component.html',
})
export class ShopWidgetsComponent {
  cartState$: Observable<{ productOrders: ProductOrder[]; totalQuantity: number }>;
  favoriteProducts$: Observable<Array<Product>>;
  orders$!: Observable<DomainEntity<number>>;

  constructor(private store: Store<ApplicationState>, private router: Router) {
    this.orders$ = this.store.select(getOrdersTotalCount);
    this.favoriteProducts$ = this.store.select(getAllFavoriteProducts);
    this.cartState$ = this.store.select(getAllProductsInCartWithTotalQuantity);
    this.store.dispatch(ShopActions.countOrders());
  }

  handleOrdersClicked(): void {
    this.router.navigate(['orders']);
  }

  handleAddAllProductsToCart(favoriteProducts: Array<Product>) {
    this.store.dispatch(
      CartActions.addProductsToCart({
        productOrders: favoriteProducts.map<ProductOrder>((prod) => ({ product: prod, quantity: 1 })),
      })
    );
    this.store.dispatch(FavoriteActions.removeAllProductsFromFavorite());
  }

  handleRemoveProductFromFavorite(product: Product) {
    this.store.dispatch(FavoriteActions.removeProductFromFavorite({ product }));
  }

  handleAddProductToCart($event: ProductOrder) {
  }

  handleUpdateProductQuantity(productOrder: { product: Product; quantity: number }) {
    this.store.dispatch(CartActions.updateProductQuantity({ productOrder }));
  }

  handleRemoveProductFromCart(productOrder: ProductOrder) {
    this.store.dispatch(CartActions.removeProductFromCart({ productOrder }));
  }
}
