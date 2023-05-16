// A mock function to mimic making an async request for data
import axios from "axios";
import { ApiConfig } from "../../common/ApiConfig";
import { LoginModel } from "../../models/login";
import { RegisterModel } from "../../models/register";

const register = async (params: RegisterModel) => {
  let response = null;
  const reqURL = ApiConfig.prod_baseUrl + "api/register/";
  await axios
    .post(reqURL, params)
    .then((res) => {
      response = res.status;
    })
    .catch((err) => console.log(err));
  return response;
};
const login = async (params: LoginModel) => {
  let response = null;
  const reqURL = ApiConfig.prod_baseUrl + "api/login/";
  await axios
    .post(reqURL, params)
    .then((res) => {
      response = res.data.access_token;
    })
    .catch((err) => console.log(err));
  return response;
};

export { register, login };
