import { ApplicationState } from '../../../store/app-state.module';
import { createSelector } from '@ngrx/store';
import { FavoriteState } from './favorite-state.model';
import { Product } from '@food-shop-architecture-workshop/core/model';

const favoriteSelector = (appState: ApplicationState) => {
  return appState.favoriteState;
};

export const getAllFavoriteProducts = createSelector<ApplicationState, FavoriteState, Array<Product>>(
  favoriteSelector,
  (s1) => s1.products
);

export const isProductToFavorite = (productId: number | string) =>
  createSelector<ApplicationState, Array<Product>, boolean>(getAllFavoriteProducts, (s1) => {
    return !!s1.find((prod) => prod.id === productId);
  });

export const getTotalProductsAtFavorite = createSelector<ApplicationState, Array<Product>, number>(
  getAllFavoriteProducts,
  (products) => products.length
);
