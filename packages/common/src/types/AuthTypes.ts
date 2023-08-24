import { ISessionUser } from "./UserTypes";

// **** Request / Response Types **** //

export interface ILoginReq {
  email: string;
  password: string;
}

export interface ILoginRes {
    user: ISessionUser;
}

export interface IRegisterReq {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface IRegisterRes {
    user: ISessionUser;
}