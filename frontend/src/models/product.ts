import { ProductColorModel } from "./productColor";

export interface ProductModel {
  id: number;
  category: string;
  images: [{ image?: string }];
  colors: Array<ProductColorModel>;
  name: string;
  price: number;
  content: string;
  no_of_order: number;
  gender: [];
  form_face: [];
  glasses_shape: [];
  glasses_material: [];
  thumbnail: string;
  origin_price?: number;
}
