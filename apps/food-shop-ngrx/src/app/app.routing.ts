import { RouterModule, Routes } from '@angular/router';
import { ShopPageComponent } from './modules/shop/components/shop-page/shop-page.component';
import { NgModule } from '@angular/core';
import { CheckoutPageComponent } from './modules/cart/components/checkout-page/checkout-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShopPageComponent,
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
  },
  {
    path: 'orders',
    loadChildren: () => import('./modules/orders/orders.module').then((m) => m.OrdersModule),
  },
  /*{
    path: 'orders',
    component: YourOrdersComponent,
  },
  {
    path: 'orders/:id',
    component: YourOrderDetailsComponent,
  },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRouting {}
