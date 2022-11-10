import { ApplicationState } from '../../../store/app-state.module';
import { createSelector } from '@ngrx/store';
import { CartState } from './cart-state.model';
import { DomainEntity, Order, OrderPaymentSummary, ProductOrder } from '@food-shop-architecture-workshop/core/model';
import { getCartPriceModel } from '@food-shop-architecture-workshop/food-shop/cart/cart-utility';
import { environment } from '../../../../environments/environment';

const selectCartState = (appState: ApplicationState) => appState.cartState;
const vatRate = environment.vatRatePercentage;
const serviceChargePercentage = environment.serviceChargePercentage;

export const getAllProductsInCart = createSelector<ApplicationState, CartState, Array<ProductOrder>>(
  selectCartState,
  (s1) => s1.products
);

export const getAllProductsInCartWithTotalQuantity = createSelector<
  ApplicationState,
  Array<ProductOrder>,
  { productOrders: ProductOrder[]; totalQuantity: number }
>(getAllProductsInCart, (s1) => {
  return {
    productOrders: s1,
    totalQuantity: s1.length === 0 ? 0 : s1.map((prod) => prod.quantity).reduce((a, b) => a + b),
  };
});

export const getCheckoutSummary = createSelector<
  ApplicationState,
  Array<ProductOrder>,
  { orderPaymentSummaryExtraFee: OrderPaymentSummary; cartProducts: Array<ProductOrder> }
>(getAllProductsInCart, (allProducts) => {
  return {
    orderPaymentSummaryExtraFee: getCartPriceModel(allProducts, vatRate, serviceChargePercentage),
    cartProducts: allProducts,
  };
});

export const getCreateOrderState = createSelector<ApplicationState, CartState, DomainEntity<Order | undefined>>(
  selectCartState,
  (s1) => s1.createOrder
);
