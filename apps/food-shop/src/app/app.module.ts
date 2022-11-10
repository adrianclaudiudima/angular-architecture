import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IconsRegistryModule, MaterialModule } from '@food-shop-architecture-workshop/core/theme';
import { ShopWidgetsComponent } from './components/shop-widgets/shop-widgets.component';
import { FoodShopOrdersOrdersWidgetModule } from '@food-shop-architecture-workshop/food-shop/orders/orders-widget';
import { FoodShopCartCartWidgetModule } from '@food-shop-architecture-workshop/food-shop/cart/cart-widget';
import { FoodShopFavoriteFavoriteWidgetModule } from '@food-shop-architecture-workshop/food-shop/favorite/favorite-widget';
import { CartStateService } from './services/cart-state.service';
import { CheckoutStateService } from './services/checkout-state.service';
import { FavoriteStateService } from './services/favorite-state.service';
import { OrdersStateService } from './services/orders-state.service';
import { ProductsStateService } from './services/products-state.service';
import { ApiServiceModule } from '@food-shop-architecture-workshop/core/services/api-service';
import { ShopComponent } from './components/shop/shop.component';
import { DomPortalModule } from '@food-shop-architecture-workshop/shared/components/dom-portal';
import { AppRouting } from './app.routing';
import { FoodShopCategoryCategorySummaryModule } from '@food-shop-architecture-workshop/food-shop/category/category-summary';
import { OverlayProductDetailsDialog } from './components/product-details-overlay/product-details-overlay.component';
import { FoodShopProductProductListModule } from '@food-shop-architecture-workshop/food-shop/product/product-list';
import { FoodShopProductProductDetailsModule } from '@food-shop-architecture-workshop/food-shop/product/product-details';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FoodShopCheckoutCheckoutDetailsModule } from '@food-shop-architecture-workshop/food-shop/checkout/checkout-details';
import { YourOrdersComponent } from './components/your-orders/your-orders.component';
import { YourOrderDetailsComponent } from './components/your-order-details/your-order-details.component';
import { FoodShopOrdersOrderCardListModule } from '@food-shop-architecture-workshop/food-shop/orders/order-card-list';
import { FoodShopOrdersOrderDetailsModule } from '@food-shop-architecture-workshop/food-shop/orders/order-details';
import * as uuid from 'uuid';

@NgModule({
  declarations: [
    AppComponent,
    ShopWidgetsComponent,
    ShopComponent,
    OverlayProductDetailsDialog,
    CheckoutComponent,
    YourOrdersComponent,
    YourOrderDetailsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    AppRouting,
    ApiServiceModule,
    FoodShopOrdersOrdersWidgetModule,
    FoodShopCartCartWidgetModule,
    FoodShopFavoriteFavoriteWidgetModule,
    FoodShopCategoryCategorySummaryModule,
    DomPortalModule,
    IconsRegistryModule,
    FoodShopProductProductListModule,
    FoodShopProductProductDetailsModule,
    FoodShopCheckoutCheckoutDetailsModule,
    FoodShopOrdersOrderCardListModule,
    FoodShopOrdersOrderDetailsModule,
  ],
  providers: [CartStateService, CheckoutStateService, FavoriteStateService, OrdersStateService, ProductsStateService],
  bootstrap: [AppComponent],
})
export class AppModule {

}
