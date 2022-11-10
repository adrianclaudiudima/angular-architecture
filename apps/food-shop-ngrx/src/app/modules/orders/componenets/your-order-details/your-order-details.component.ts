import { Component } from '@angular/core';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { DomainEntity, Order } from '@food-shop-architecture-workshop/core/model';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersApiService } from '@food-shop-architecture-workshop/core/services/api-service';
import { Store } from '@ngrx/store';
import { OrdersState } from '../../store/orders-state.model';
import { getSelectedOrder, isOrderDetailsLoaded } from '../../store/orders.selectors';
import { OrdersActions } from '../../store/orders.actions';

@Component({
  selector: 'app-your-order-details',
  templateUrl: 'your-order-details.component.html',
})
export class YourOrderDetailsComponent {
  order$: Observable<DomainEntity<Order | undefined>>;

  constructor(
    private router: Router,
    private activatedRute: ActivatedRoute,
    private ordersApiService: OrdersApiService,
    private store: Store<OrdersState>
  ) {
    this.order$ = this.activatedRute.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      tap((id) => {
        if (!id) {
          this.router.navigate(['/orders']);
        }
      }),
      filter((id) => !!id),
      switchMap((id) =>
        store.select(isOrderDetailsLoaded(id as string)).pipe(
          switchMap((isOrderDetailsLoaded) => {
            if (isOrderDetailsLoaded) {
              return this.store.select(getSelectedOrder);
            } else {
              this.store.dispatch(OrdersActions.loadOrderDetails({ orderId: id as string }));
              return this.store.select(getSelectedOrder);
            }
          })
        )
      )
    );
  }
}
