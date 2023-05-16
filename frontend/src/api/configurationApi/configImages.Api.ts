// api/config-image/
import axios from "axios";
import { ApiConfig } from "../../common/ApiConfig";
import { PromotionConfigModel } from "../../models/promotionConfigModel";

export interface MainBackgroundModel {
  image?: string;
}
export interface FontModal {
  font?: string;
}

export interface ConfigImageModel {
  main_background?: MainBackgroundModel[];
  inform_backgroud?: string;
  promotion_background?: string;
  bestseller_background?: string;
  recommend_glass_image?: string;
}
export const fetchConfigImage = async (): Promise<ConfigImageModel> => {
  let response: ConfigImageModel = {};
  const reqURL = ApiConfig.prod_baseUrl + "api/config-image/";
  await axios
    .get(reqURL)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => console.log(err));
  return response;
};

export const fetchPromotionConfig = async (): Promise<PromotionConfigModel> => {
  let response: PromotionConfigModel = {};
  const reqURL = ApiConfig.prod_baseUrl + "api/config-promotion-register/";
  await axios
    .get(reqURL)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => console.log(err));
  return response;
};

export const fetchFonts = async (): Promise<FontModal> => {
  let response: FontModal = {};
  const reqURL = ApiConfig.prod_baseUrl + "api/config-font/";
  await axios
    .get(reqURL)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => console.log(err));
  return response;
};
