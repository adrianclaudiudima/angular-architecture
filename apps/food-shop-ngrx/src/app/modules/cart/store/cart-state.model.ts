import { DomainEntity, Order, ProductOrder } from '@food-shop-architecture-workshop/core/model';

export interface CartState {
  products: Array<ProductOrder>;
  createOrder: DomainEntity<Order | undefined>;
}
