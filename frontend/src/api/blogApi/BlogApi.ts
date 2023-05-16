import axios from "axios";
import { ApiConfig } from "../../common/ApiConfig";

export interface BlogModal {
  id?: number;
  thumbnail?: string;
  title?: string;
  author_display?: string;
  date_display?: string;
  slug?: string;
  preview_body?: string;
  body?: string;
}

export const fetchBlog = async (): Promise<BlogModal[]> => {
  let response: BlogModal[] = [];
  const reqURL = ApiConfig.prod_baseUrl + "api/blogs/";
  await axios
    .get(reqURL)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => console.log(err));
  return response;
};

export const fetchBlogDetail = async (slug: string): Promise<BlogModal> => {
  let response: BlogModal = {};
  const reqURL = ApiConfig.prod_baseUrl + "api/blogs/" + slug;
  await axios
    .get(reqURL)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => console.log(err));
  return response;
};
