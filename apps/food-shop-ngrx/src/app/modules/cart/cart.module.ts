import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@food-shop-architecture-workshop/core/theme';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { FoodShopCheckoutCheckoutDetailsModule } from '@food-shop-architecture-workshop/food-shop/checkout/checkout-details';
import { DomPortalModule } from '@food-shop-architecture-workshop/shared/components/dom-portal';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CheckoutPageComponent],
  imports: [CommonModule, MaterialModule, RouterModule, FoodShopCheckoutCheckoutDetailsModule, DomPortalModule],
  exports: [CheckoutPageComponent],
})
export class CartModule {
}
