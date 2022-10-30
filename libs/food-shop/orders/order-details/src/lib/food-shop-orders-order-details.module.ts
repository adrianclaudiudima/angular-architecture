import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderStatusBarComponent } from './components/order-status-bar/order-status-bar.component';

@NgModule({
  declarations: [OrderDetailsComponent, OrderStatusBarComponent],
  imports: [CommonModule],
  exports: [OrderDetailsComponent],
})
export class FoodShopOrdersOrderDetailsModule {}
