import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YourOrdersComponent } from './componenets/your-orders/your-orders.component';
import { YourOrderDetailsComponent } from './componenets/your-order-details/your-order-details.component';

/*
{
    path: 'orders',
    component: YourOrdersComponent,
  },
  {
    path: 'orders/:id',
    component: YourOrderDetailsComponent,
  },
* */

const ordersRoutes: Routes = [
  {
    path: '',
    component: YourOrdersComponent,
  },
  {
    path: ':id',
    component: YourOrderDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ordersRoutes)],
  exports: [RouterModule],
})
export class OrdersRouting {}
