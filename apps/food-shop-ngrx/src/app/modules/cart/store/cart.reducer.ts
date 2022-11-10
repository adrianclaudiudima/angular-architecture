import { createReducer, on } from '@ngrx/store';
import { CartState } from './cart-state.model';
import { CartActions } from './cart.actions';
import { ProductOrder } from '@food-shop-architecture-workshop/core/model';
import { updateProductOrderQuantity } from './cart.util';

const cartInitialState: CartState = {
  products: [],
  createOrder: {
    domain: undefined,
    requestStatus: {
      status: 'NEW',
    },
  },
};

export const cartReducer = createReducer<CartState>(
  cartInitialState,
  on(CartActions.addProductToCart, (state, { productOrder }) => {
    return { ...state, products: updateProductOrderQuantity([...state.products], productOrder) };
  }),
  on(CartActions.addProductsToCart, (state, { productOrders }) => {
    let allProductOrders: Array<ProductOrder> = [...state.products];
    productOrders.forEach((po) => {
      allProductOrders = updateProductOrderQuantity(allProductOrders, po);
    });
    return { ...state, products: allProductOrders };
  }),
  on(CartActions.removeProductFromCart, (state, { productOrder }) => ({
    ...state,
    products: state.products.filter((po) => po.product.id !== productOrder.product.id),
  })),
  on(CartActions.removeAllProductsFromCart, (state) => ({ ...state, products: [] })),
  on(CartActions.updateProductQuantity, (state, { productOrder }) => ({
    ...state,
    products: state.products.map((prod) =>
      prod.product.id === productOrder.product.id ? { ...prod, quantity: productOrder.quantity } : { ...prod }
    ),
  })),
  on(CartActions.createOrder, (state, { order }) => ({
    ...state,
    createOrder: {
      domain: order,
      requestStatus: {
        status: 'PENDING',
      },
    },
  })),
  on(CartActions.createOrderSuccess, (state, { order }) => ({
    ...state,
    createOrder: {
      domain: order,
      requestStatus: {
        status: 'COMPLETED',
      },
    },
  })),
  on(CartActions.createOrderFail, (state, { errorMessage }) => ({
    ...state,
    createOrder: {
      ...state.createOrder,
      requestStatus: {
        status: 'ERROR',
        error: { message: errorMessage },
      },
    },
  }))
);
