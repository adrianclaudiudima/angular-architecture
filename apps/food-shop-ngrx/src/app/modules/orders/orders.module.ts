import { NgModule } from '@angular/core';
import { YourOrdersComponent } from './componenets/your-orders/your-orders.component';
import { YourOrderDetailsComponent } from './componenets/your-order-details/your-order-details.component';
import { IconsRegistryModule, MaterialModule } from '@food-shop-architecture-workshop/core/theme';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ApiServiceModule } from '@food-shop-architecture-workshop/core/services/api-service';
import { OrdersRouting } from './orders.routing';
import { ORDERS_REDUX_KEY } from './store/orders-state.model';
import { ordersReducer } from './store/orders.reducer';
import { OrdersEffects } from './store/orders.effects';
import { DomPortalModule } from "@food-shop-architecture-workshop/shared/components/dom-portal";
import { FoodShopOrdersOrderCardListModule } from "@food-shop-architecture-workshop/food-shop/orders/order-card-list";
import { FoodShopOrdersOrderDetailsModule } from "@food-shop-architecture-workshop/food-shop/orders/order-details";

@NgModule({
  declarations: [YourOrdersComponent, YourOrderDetailsComponent],
  imports: [
    CommonModule,
    OrdersRouting,
    MaterialModule,
    DomPortalModule,
    StoreModule.forFeature(ORDERS_REDUX_KEY, ordersReducer),
    EffectsModule.forFeature([OrdersEffects]),
    ApiServiceModule,
    IconsRegistryModule,
    FoodShopOrdersOrderCardListModule,
    FoodShopOrdersOrderDetailsModule,
  ],
  exports: [YourOrdersComponent, YourOrderDetailsComponent],
})
export class OrdersModule {}
