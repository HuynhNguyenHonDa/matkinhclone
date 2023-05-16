import axios from "axios";
import { ApiConfig } from "../../common/ApiConfig";
import { ProductOrderedModel } from "../../models/productOrdered";
import { ProductOrderNoTokenModel } from "../../models/ProductOrderNoTokenModel";

export const submitOrder = async (params?: Array<ProductOrderedModel>) => {
  const token = sessionStorage.getItem("token");
  const headers = {
    Authorization: "Bearer " + token,
  };
  let response = null;
  const reqURL = ApiConfig.prod_baseUrl + "api/order/";
  await axios
    .post(reqURL, params, {
      headers: headers,
    })
    .then((res) => {
      response = res;
      console.log("response: " + response);
    })
    .catch((err) => console.log(err));
  return response;
};

export const submitOrderNoToken = async (params?: ProductOrderNoTokenModel) => {
  let response = null;
  const reqURL = ApiConfig.prod_baseUrl + "api/order-no-token/";
  await axios
    .post(reqURL, params)
    .then((res) => {
      response = res;
      console.log("response: " + response);
    })
    .catch((err) => console.log("err", err));
  return response;
};
