import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrdersState } from '../../store/orders-state.model';
import { Observable } from 'rxjs';
import { getOrdersState } from '../../store/orders.selectors';
import { Order } from '@food-shop-architecture-workshop/core/model';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersActions } from '../../store/orders.actions';

@Component({
  selector: 'app-your-orders',
  templateUrl: 'your-orders.component.html',
})
export class YourOrdersComponent {
  orders$: Observable<OrdersState>;

  constructor(private store: Store<OrdersState>, private router: Router, private activatedRoute: ActivatedRoute) {
    this.orders$ = store.select(getOrdersState);
    this.store.dispatch(OrdersActions.loadOrders());
  }

  selectOrder(order: Order) {
    this.store.dispatch(OrdersActions.setOrderDetails({ order }));
    this.router.navigate([order.id], { relativeTo: this.activatedRoute });
  }
}
