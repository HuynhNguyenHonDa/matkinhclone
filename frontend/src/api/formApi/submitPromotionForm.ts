import axios from "axios";
import { ApiConfig } from "../../common/ApiConfig";
import React from "react";

export interface promotionModel {
  name: string;
  email: string;
  phonenumber: string;
  note: string;
}
export const submitPromotionForm = async (params: promotionModel) => {
  let response = null;
  const reqURL = ApiConfig.prod_baseUrl + "api/register-receive-news/";
  await axios
    .post(reqURL, params)
    .then((res) => {
      response = res.data.access_token;
    })
    .catch((err) => console.log(err));
  return response;
};
