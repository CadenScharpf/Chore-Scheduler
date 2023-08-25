import axios, { AxiosResponse } from "axios";
import { ILoginRes, IRegisterRes, ISessionUser } from "chore-scheduler-common";

const API_URL = "/api/auth/";

const register = (email: string, password: string) => {
  return axios.post(API_URL + "register", {
    email,
    password,
  }).then((response: AxiosResponse<IRegisterRes>) => {
    let user: ISessionUser = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
    return user;
  });
};

const login = (email: string, password: string) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    }).then((response: AxiosResponse<ILoginRes>) => {
      let user: ISessionUser = response.data.user;
        localStorage.setItem("user", JSON.stringify(user));
      return user; 
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  let user: ISessionUser = JSON.parse(localStorage.getItem("user") ?? "{}");
  return user;
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
