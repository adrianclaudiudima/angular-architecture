import { createReducer, on } from '@ngrx/store';
import { FavoriteState } from './favorite-state.model';
import { FavoriteActions } from './favorite.actions';

const favoriteInitialState: FavoriteState = {
  products: [],
};

export const favoriteReducer = createReducer<FavoriteState>(
  favoriteInitialState,
  on(FavoriteActions.addProductToFavorite, (state, { product }) => {
    return {
      ...state,
      products: [...state.products, product],
    };
  }),
  on(FavoriteActions.removeProductFromFavorite, (state, { product }) => {
    return {
      ...state,
      products: [...state.products.filter((prod) => prod.id !== product.id)],
    };
  }),
  on(FavoriteActions.removeAllProductsFromFavorite, (state) => ({ ...state, products: [] }))
);
