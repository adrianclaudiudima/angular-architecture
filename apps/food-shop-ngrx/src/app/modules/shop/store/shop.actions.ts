import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CategorySummary, Product, ProductType } from '@food-shop-architecture-workshop/core/model';

export const ShopActions = createActionGroup({
  source: 'Shop',
  events: {
    'Load Products And Categories': emptyProps(),
    'Load Products And Categories Success': props<{ products: Array<Product>; categories: Array<CategorySummary> }>(),
    'Load Products And Categories Failed': props<{ errorMessage: string }>(),
    'Filter Products': props<{ productType: ProductType | undefined }>(),
    'Count orders': emptyProps(),
    'Count orders success': props<{ totalOrders: number }>(),
    'Count orders failed': props<{ errorMessage: string }>(),
  },
});
