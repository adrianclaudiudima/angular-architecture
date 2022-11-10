import { Component } from '@angular/core';
import { InputRadioCardModel } from '@food-shop-architecture-workshop/shared/components/input-radio-card';
import { BehaviorSubject, combineLatest, filter, map, Observable, Subject, take, tap } from 'rxjs';
import { Order, OrderPaymentSummaryExtraFee, ProductOrder } from '@food-shop-architecture-workshop/core/model';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../../../store/app-state.module';
import { getCheckoutSummary, getCreateOrderState } from '../../store/cart.selectors';
import {
  getCartPriceFeeModel,
  mapPaymentFeeFromCardData,
} from '@food-shop-architecture-workshop/food-shop/cart/cart-utility';
import { CartActions } from '../../store/cart.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  templateUrl: 'checkout-page.component.html',
})
export class CheckoutPageComponent {
  cardData: Array<InputRadioCardModel> = [
    { name: 'Card', description: 'Card transaction fee', value: 0.0, valueDescription: '$0.00', selected: true },
    { name: 'Cash', description: 'Cash processing fee', value: 2.5, valueDescription: '$2.50', selected: false },
  ];

  private feeChanged: Subject<number> = new BehaviorSubject(mapPaymentFeeFromCardData(this.cardData));

  checkoutData$: Observable<{
    orderPaymentSummaryExtraFee: OrderPaymentSummaryExtraFee;
    cartProducts: Array<ProductOrder>;
  }>;

  constructor(private store: Store<ApplicationState>, protected router: Router) {
    this.checkoutData$ = combineLatest([
      this.store.select(getCheckoutSummary).pipe(
        tap((products) => {
          if (products.cartProducts.length === 0) {
            this.router.navigate(['/']);
          }
        })
      ),
      this.feeChanged.asObservable(),
    ]).pipe(
      map(([checkoutSummary, fee]) => ({
        cartProducts: checkoutSummary.cartProducts,
        orderPaymentSummaryExtraFee: getCartPriceFeeModel(checkoutSummary.orderPaymentSummaryExtraFee, fee),
      }))
    );
  }

  handleRemoveProduct(productOrder: ProductOrder) {
    this.store.dispatch(CartActions.removeProductFromCart({ productOrder }));
  }

  handleUpdateProductQuantity(productOrder: ProductOrder) {
    this.store.dispatch(CartActions.updateProductQuantity({ productOrder }));
  }

  handlePaymentMethodChange(cardModels: InputRadioCardModel[]) {
    this.feeChanged.next(mapPaymentFeeFromCardData(cardModels));
  }

  handleCreateOrder(order: Order) {
    this.store.dispatch(CartActions.createOrder({ order }));
    this.store
      .select(getCreateOrderState)
      .pipe(
        filter(
          (cartState) => cartState.requestStatus.status === 'COMPLETED' || cartState.requestStatus.status === 'ERROR'
        ),
        take(1)
      )
      .subscribe((resp) => {
        if (resp.requestStatus.status === 'COMPLETED') {
          this.router.navigate(['orders', resp.domain?.id]);
        } else {
          // ERROR Handling should be implemented in component. Homework :)
        }
      });
  }
}
