import axios from "axios";
import { ApiConfig } from "../../common/ApiConfig";

export interface ContactModel {
  nameshop?: string;
  address?: string;
  Phone?: string;
  facebook?: string;
  shopee_id?: string;
  lazada_ip?: string;
  image?: string;
  google_map_url?: string;
  recommend_glass_description?: string;
}
export const fetchContact = async (): Promise<ContactModel> => {
  let response: ContactModel = {};
  const reqURL = ApiConfig.prod_baseUrl + "api/config-contact/";
  await axios
    .get(reqURL)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => console.log(err));
  return response;
};
