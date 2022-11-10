import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../../store/app-state.module';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ShopActions } from './shop.actions';
import {
  CategoriesApiService,
  OrdersApiService,
  ProductsApiService,
} from '@food-shop-architecture-workshop/core/services/api-service';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';

@Injectable()
export class ShopEffects {
  loadProductsAndCategories$ = createEffect(() =>
    this.actions.pipe(
      ofType(ShopActions.loadProductsAndCategories),
      switchMap(() =>
        forkJoin([this.productsApiService.loadProducts(), this.categoriesApiService.loadProductCategories()]).pipe(
          map(([products, categories]) => ShopActions.loadProductsAndCategoriesSuccess({ products, categories })),
          catchError((err) =>
            of(
              ShopActions.loadProductsAndCategoriesFailed({
                errorMessage: 'Something went wrong... Please try again later',
              })
            )
          )
        )
      )
    )
  );

  countOrders$ = createEffect(() => {
    return this.actions.pipe(
      ofType(ShopActions.countOrders),
      switchMap(() => {
        return this.ordersApiService.getOrdersTotalCount().pipe(
          map((totalOrders) => ShopActions.countOrdersSuccess({ totalOrders })),
          catchError((err) => {
            return of(
              ShopActions.countOrdersFailed({ errorMessage: 'Something went wrong... Please try again later' })
            );
          })
        );
      })
    );
  });

  constructor(
    private store: Store<ApplicationState>,
    private actions: Actions,
    private productsApiService: ProductsApiService,
    private categoriesApiService: CategoriesApiService,
    private ordersApiService: OrdersApiService
  ) {}
}
