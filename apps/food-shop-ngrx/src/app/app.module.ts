import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { foodShopActionReducerMap } from './store/app-state.module';
import { ShopModule } from './modules/shop/shop.module';
import { AppRouting } from './app.routing';
import { ShopEffects } from './modules/shop/store/shop.effects';
import { EffectsModule } from '@ngrx/effects';
import { ApiServiceModule } from '@food-shop-architecture-workshop/core/services/api-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsRegistryModule } from '@food-shop-architecture-workshop/core/theme';
import { CartModule } from './modules/cart/cart.module';
import { metaReducers } from './store/storage.metareducer';
import { CartEffects } from './modules/cart/store/cart.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    ApiServiceModule,
    StoreModule.forRoot(foodShopActionReducerMap, {
      metaReducers: metaReducers,
      runtimeChecks: { strictStateImmutability: true, strictStateSerializability: true },
    }),
    EffectsModule.forRoot([ShopEffects, CartEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    AppRouting,
    ShopModule,
    IconsRegistryModule,
    CartModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
