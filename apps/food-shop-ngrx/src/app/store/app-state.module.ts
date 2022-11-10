import { DomainEntity, Order } from '@food-shop-architecture-workshop/core/model';
import { ShopState } from '../modules/shop/store/shop-state.model';
import { ActionReducerMap } from '@ngrx/store';
import { shopReducer } from '../modules/shop/store/shop.reducer';
import { FavoriteState } from '../modules/favorite/store/favorite-state.model';
import { favoriteReducer } from '../modules/favorite/store/favorite.reducer';
import { CartState } from '../modules/cart/store/cart-state.model';
import { cartReducer } from '../modules/cart/store/cart.reducer';

export interface ApplicationState {
  shopState: ShopState;
  cartState: CartState;
  favoriteState: FavoriteState;
}

export interface OrdersState extends DomainEntity<Array<Order>> {}

export const foodShopActionReducerMap: ActionReducerMap<ApplicationState> = {
  shopState: shopReducer,
  favoriteState: favoriteReducer,
  cartState: cartReducer,
};
