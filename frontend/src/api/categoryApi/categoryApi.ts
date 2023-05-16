// A mock function to mimic making an async request for data
import axios from "axios";
import { ApiConfig } from "../../common/ApiConfig";
import { CategoryModel } from "../../models/category";

export interface TreeCategoryModal {
  id?: number;
  children?: CategoryModel[];
  name?: string;
}

export const fetchTreeCategory = async (): Promise<TreeCategoryModal[]> => {
  let response: TreeCategoryModal[] = [];
  const reqURL = ApiConfig.prod_baseUrl + "api/treecategory/";
  await axios
    .get(reqURL)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => console.log(err));
  return response;
};
