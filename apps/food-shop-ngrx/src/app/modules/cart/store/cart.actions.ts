import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Order, ProductOrder } from "@food-shop-architecture-workshop/core/model";

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Add Product To Cart': props<{ productOrder: ProductOrder }>(),
    'Add Products To Cart': props<{ productOrders: Array<ProductOrder> }>(),
    'Remove Product From Cart': props<{ productOrder: ProductOrder }>(),
    'Remove All Products From Cart': emptyProps(),
    'Update product quantity': props<{ productOrder: ProductOrder }>(),
    'Create order': props<{ order: Order }>(),
    'Create order success': props<{ order: Order }>(),
    'Create order fail': props<{ errorMessage: any }>(),
  },
});
