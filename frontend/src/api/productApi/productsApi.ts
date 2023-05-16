import axios from "axios";
import { ApiConfig } from "../../common/ApiConfig";
import { ProductModel } from "../../models/product";

const fetchProducts = () => {
  return;
};

const getProductById = async (id: number): Promise<ProductModel> => {
  let response = {} as ProductModel;
  await axios
    .get(ApiConfig.prod_baseUrl + "api/product/" + id)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.error(err);
    });
  return response;
};

export const fetchProductByCategory = async (
  id: number
): Promise<ProductModel[]> => {
  let response = [] as ProductModel[];
  await axios
    .get(ApiConfig.prod_baseUrl + "api/product/", {
      params: { category: id },
    })
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.error(err);
    });
  return response;
};

export { fetchProducts, getProductById };
