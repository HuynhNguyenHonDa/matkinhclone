import { ProductOrderedModel } from "./productOrdered";

export interface ProductOrderNoTokenModel {
  name?: string;
  email?: string;
  phonenumber?: string;
  address?: string;
  products: ProductOrderedModel[];
}
