import { createReducer, on } from '@ngrx/store';
import { ShopState } from './shop-state.model';
import { ShopActions } from './shop.actions';

const shopInitialState: ShopState = {
  domain: {
    products: [],
    categories: [],
  },
  requestStatus: {
    status: 'NEW',
  },
  filter: undefined,
  selectedFilterIndex: 0,
  ordersTotalCount: {
    domain: 0,
    requestStatus: {
      status: 'NEW',
    },
  },
};

export const shopReducer = createReducer<ShopState>(
  shopInitialState,
  on(ShopActions.loadProductsAndCategories, (state) => ({
    ...state,
    requestStatus: { status: 'PENDING' },
  })),
  on(ShopActions.loadProductsAndCategoriesSuccess, (state, { categories, products }) => ({
    ...state,
    requestStatus: {
      status: 'COMPLETED',
    },
    domain: {
      categories,
      products,
    },
  })),
  on(ShopActions.loadProductsAndCategoriesFailed, (state, { errorMessage }) => ({
    ...state,
    requestStatus: { status: 'ERROR', error: { message: errorMessage } },
  })),
  on(ShopActions.filterProducts, (state, { productType }) => {
    return {
      ...state,
      filter: productType,
    };
  }),
  on(ShopActions.countOrders, (state) => ({
    ...state,
    ordersTotalCount: {
      ...state.ordersTotalCount,
      requestStatus: {
        status: 'PENDING',
      },
    },
  })),
  on(ShopActions.countOrdersSuccess, (state, { totalOrders }) => {
    return {
      ...state,
      ordersTotalCount: {
        domain: totalOrders,
        requestStatus: {
          status: 'COMPLETED',
        },
      },
    };
  }),
  on(ShopActions.countOrdersFailed, (state, { errorMessage }) => {
    return {
      ...state,
      ordersTotalCount: {
        ...state.ordersTotalCount,
        requestStatus: {
          status: 'ERROR',
          error: {
            message: errorMessage,
          },
        },
      },
    };
  })
);
