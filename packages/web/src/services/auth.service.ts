import axios, { AxiosResponse } from "axios";
import { ILoginRes, IRegisterRes, ISessionUser } from "chore-scheduler-common";
import { INewUser } from "chore-scheduler-common";

const API_URL = "/api/auth/";

const register = (newUser: INewUser) => {
  return axios.post(API_URL + "register", {
    user: newUser,
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
  return axios.post(API_URL + "logout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = (): ISessionUser | null => {

  return JSON.parse(localStorage.getItem("user") ?? "null");
};

const autoSignIn = () => {
  return axios.get(API_URL + "me").then((response) => {
    let user: ISessionUser = response.data.user;
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }).catch((err) => {});
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  autoSignIn,
}

export default AuthService;
