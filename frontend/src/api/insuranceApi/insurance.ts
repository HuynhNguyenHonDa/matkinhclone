import axios from "axios";
import { ApiConfig } from "../../common/ApiConfig";
import React from "react";

export interface InsuranceModel {
  id: number;
  description?: string;
  title?: string;
}
export const fetchInsurance = async (): Promise<InsuranceModel[]> => {
  let response: InsuranceModel[] = [];
  const reqURL = ApiConfig.prod_baseUrl + "api/config-insurance/";
  await axios
    .get(reqURL)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => console.log(err));
  return response;
};
