import { ApplicationState } from '../../../store/app-state.module';
import { createSelector } from '@ngrx/store';
import { ShopState } from './shop-state.model';
import { CategorySummary, DomainEntity } from '@food-shop-architecture-workshop/core/model';

const shopState = (appState: ApplicationState) => appState.shopState;

export const getProductsAndCategories = createSelector<ApplicationState, ShopState, ShopState>(shopState, (s1) => s1);
export const getShopStateWithProductsFiltered = createSelector<ApplicationState, ShopState, ShopState>(
  shopState,
  (s1) => {
    if (s1.filter === undefined) {
      return { ...s1, selectedFilterIndex: 0 };
    } else {
      const filterCategorySummary: CategorySummary | undefined = s1.domain.categories.find(
        (cat) => cat.type === s1.filter
      );
      return {
        ...s1,
        domain: {
          ...s1.domain,
          products: s1.domain.products.filter((p) => p.productType === s1.filter),
        },
        selectedFilterIndex:
          filterCategorySummary !== undefined ? s1.domain.categories.indexOf(filterCategorySummary) + 1 : 0,
      };
    }
  }
);

export const getOrdersTotalCount = createSelector<ApplicationState, ShopState, DomainEntity<number>>(
  shopState,
  (s1) => {
    return s1.ordersTotalCount;
  }
);
