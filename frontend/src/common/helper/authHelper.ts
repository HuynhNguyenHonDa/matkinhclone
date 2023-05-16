import jwtDecode from "jwt-decode";

export const authHelper = (authenticationInform: any) => {
  if (!isValidToken(authenticationInform)) {
    return "token is not valid";
  }
  sessionStorage.setItem("token", authenticationInform);
};

export const loginHelper = (authenticationInform: any) => {
  const data = jwtDecode(authenticationInform);
  if (!isValidToken(data)) {
    return "token is not valid";
  }
  sessionStorage.setItem("token", authenticationInform);
};

export const registerHelper = (registerInform: any) => {
  if (!isValidToken(registerInform)) {
    return "token is not valid";
  }
};


export const logoutHelper = () => {
  sessionStorage.removeItem("token");
};

const isValidToken = (token: any): boolean => {
  return (
    typeof token !== "undefined" &&
    token.hasOwnProperty("create_at") &&
    token.hasOwnProperty("expire_time") &&
    token.hasOwnProperty("id")
  );
};
