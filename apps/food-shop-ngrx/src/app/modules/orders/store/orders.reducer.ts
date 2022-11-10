import { createReducer, on } from '@ngrx/store';
import { OrdersState } from './orders-state.model';
import { OrdersActions } from './orders.actions';

const ordersInitialState: OrdersState = {
  domain: [],
  requestStatus: { status: 'NEW' },
  selectedOrder: {
    domain: undefined,
    requestStatus: {
      status: 'NEW',
    },
  },
};

export const ordersReducer = createReducer<OrdersState>(
  ordersInitialState,
  on(OrdersActions.loadOrders, (state) => {
    return {
      ...state,
      domain: [],
      requestStatus: { status: 'PENDING' },
    };
  }),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    domain: orders,
    requestStatus: { status: 'COMPLETED' },
  })),
  on(OrdersActions.loadOrdersFailed, (state, { errorMessage }) => ({
    ...state,
    domain: [],
    requestStatus: {
      status: 'ERROR',
      error: {
        message: errorMessage,
      },
    },
  })),
  on(OrdersActions.loadOrderDetails, (state) => ({
    ...state,
    selectedOrder: {
      ...state.selectedOrder,
      requestStatus: {
        status: 'PENDING',
      },
    },
  })),
  on(OrdersActions.loadOrderDetailsSuccess, (state, { order }) => ({
    ...state,
    selectedOrder: {
      domain: order,
      requestStatus: {
        status: 'COMPLETED',
      },
    },
  })),
  on(OrdersActions.loadOrderDetailsFailed, (state, { errorMessage }) => ({
    ...state,
    selectedOrder: {
      domain: undefined,
      requestStatus: {
        status: 'ERROR',
        error: {
          message: errorMessage,
        },
      },
    },
  })),
  on(OrdersActions.setOrderDetails, (state, { order }) => ({
    ...state,
    selectedOrder: {
      domain: order,
      requestStatus: {
        status: 'COMPLETED',
      },
    },
  }))
);
