import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrdersState } from './orders-state.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrdersActions } from './orders.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { OrdersApiService } from '@food-shop-architecture-workshop/core/services/api-service';

@Injectable()
export class OrdersEffects {
  constructor(
    private store: Store<OrdersState>,
    private actions$: Actions,
    private ordersApiService: OrdersApiService
  ) {}

  loadOrders = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrders),
      switchMap((_) =>
        this.ordersApiService.loadOrders().pipe(
          map((orders) => OrdersActions.loadOrdersSuccess({ orders })),
          catchError((err) =>
            of(OrdersActions.loadOrdersFailed({ errorMessage: 'Something went wrong. Please try again later ...' }))
          )
        )
      )
    )
  );

  loadOrderDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrderDetails),
      switchMap(({ orderId }) => {
        return this.ordersApiService.loadOrderById(orderId).pipe(
          map((order) => OrdersActions.loadOrderDetailsSuccess({ order })),
          catchError((err) =>
            of(
              OrdersActions.loadOrderDetailsFailed({ errorMessage: 'Something went wrong. Please try again later ...' })
            )
          )
        );
      })
    )
  );
}
