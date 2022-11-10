import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../../store/app-state.module';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartActions } from './cart.actions';
import { map, switchMap } from 'rxjs';
import { OrdersApiService } from '@food-shop-architecture-workshop/core/services/api-service';

@Injectable()
export class CartEffects {
  constructor(
    private store: Store<ApplicationState>,
    private actions$: Actions,
    private ordersApiService: OrdersApiService
  ) {}

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.createOrder),
      switchMap(({ order }) => {
        return this.ordersApiService.createOrder(order).pipe(
          map((response) =>
            CartActions.createOrderSuccess({
              order: response,
            })
          )
        );
      })
    )
  );
}
