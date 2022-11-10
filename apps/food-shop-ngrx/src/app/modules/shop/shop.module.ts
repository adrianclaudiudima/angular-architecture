import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@food-shop-architecture-workshop/core/theme';
import { ShopPageComponent } from './components/shop-page/shop-page.component';
import { ShopWidgetsComponent } from './components/shop-widgets/shop-widgets.component';
import { FoodShopOrdersOrdersWidgetModule } from '@food-shop-architecture-workshop/food-shop/orders/orders-widget';
import { FoodShopFavoriteFavoriteWidgetModule } from '@food-shop-architecture-workshop/food-shop/favorite/favorite-widget';
import { FoodShopCartCartWidgetModule } from '@food-shop-architecture-workshop/food-shop/cart/cart-widget';
import { DomPortalModule } from '@food-shop-architecture-workshop/shared/components/dom-portal';
import { FoodShopCategoryCategorySummaryModule } from '@food-shop-architecture-workshop/food-shop/category/category-summary';
import { FoodShopProductProductListModule } from '@food-shop-architecture-workshop/food-shop/product/product-list';
import { ProductDetailsOverlayComponent } from './components/product-details-overlay/product-details-overlay.component';
import { ShopEffects } from './store/shop.effects';
import { FoodShopProductProductDetailsModule } from "@food-shop-architecture-workshop/food-shop/product/product-details";

@NgModule({
  declarations: [ShopPageComponent, ShopWidgetsComponent, ProductDetailsOverlayComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FoodShopOrdersOrdersWidgetModule,
    FoodShopFavoriteFavoriteWidgetModule,
    FoodShopCartCartWidgetModule,
    DomPortalModule,
    FoodShopCategoryCategorySummaryModule,
    FoodShopProductProductListModule,
    FoodShopProductProductDetailsModule,
  ],
  exports: [ShopPageComponent, ShopWidgetsComponent],
  providers: [ShopEffects],
})
export class ShopModule {}
