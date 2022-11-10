import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '@food-shop-architecture-workshop/core/model';

export const FavoriteActions = createActionGroup({
  source: 'Favorite',
  events: {
    'Add product to favorite': props<{ product: Product }>(),
    'Remove product from favorite': props<{ product: Product }>(),
    'Remove all products from favorite': emptyProps(),
  },
});
