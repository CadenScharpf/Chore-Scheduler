import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import SessionUtil from "@src/util/SessionUtil";
import AuthService from "@src/services/AuthService";

import { IReq, IRes } from "./types/express/misc";
import { ISessionUser, ILoginReq, IRegisterReq } from "chore-scheduler-common";

// **** Functions **** //

/**
 * Login a user.
 **/
async function login(req: IReq<ILoginReq>, res: IRes) {
  const { email, password } = req.body;
  // Login
  const user = await AuthService.login(email, password);
  // Setup Admin Cookie
  const sessionUser: ISessionUser = { 
    id: user.id,
    email: user.name,
    name: user.name,
    role: user.role,
    phone: user.phone,
  };
  await SessionUtil.addSessionData(res, sessionUser);
  res.json({ user: sessionUser });
  // Return
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Regester a new user.
 */
async function register(req: IReq<IRegisterReq>, res: IRes) {
  const { name, email, password, phone } = req.body;
  // Login
  const user = await AuthService.register(name, email, password, phone);
}

/**
 * Logout the user.
 */
function logout(_: IReq, res: IRes) {
  SessionUtil.clearCookie(res);
  return res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //

export default {
  login,
  logout,
  register,
} as const;
