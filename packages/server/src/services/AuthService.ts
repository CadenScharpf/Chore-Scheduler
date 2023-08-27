import UserRepo from '@src/repos/UserRepo';

import PwdUtil from '@src/util/PwdUtil';
import { tick } from '@src/util/misc';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { RouteError } from '@src/other/classes';
import { IUser, isSessionUser } from 'chore-scheduler-common';
import User from '@src/models/User';
import { INewUser, ISessionUser } from 'chore-scheduler-common';
import SessionUtil from '@src/util/SessionUtil';
import { IReq } from '@src/routes/types/types';



// **** Variables **** //

// Errors
export const Errors = {
  Unauth: 'Unauthorized',
  EmailNotFound(email: string) {
    return `User with email "${email}" not found`;
  },
} as const;


// **** Functions **** //

async function me(req: IReq) {
  await SessionUtil.getSessionData<ISessionUser>(req).then((user: ISessionUser | undefined | string) => {
    if (!(user && isSessionUser(user)))  {
      throw new RouteError(
        HttpStatusCodes.UNAUTHORIZED,
        Errors.Unauth,
      );
    }
    return user;
  }
  )}
/**
 * Login a user.
 */
async function login(email: string, password: string): Promise<IUser> {
  // Fetch user
  const user = await UserRepo.getOne(email);
  if (!user) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      Errors.EmailNotFound(email),
    );
  }
  // Check password
  const hash = (user.pwdHash ?? ''),
    pwdPassed = await PwdUtil.compare(password, hash);
  if (!pwdPassed) {
    // If password failed, wait 500ms this will increase security
    await tick(500);
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED, 
      Errors.Unauth,
    );
  }
  // Return
  return user;
}





async function register(_newUser: INewUser): Promise<IUser> {
  const { name, email, password, phone } = _newUser;
  const pwdHash = await PwdUtil.getHash(password);
  const user = await UserRepo.getOne(email);
  if (user) {
    throw new RouteError(
      HttpStatusCodes.CONFLICT,
      `User with email "${email}" already exists`,
    );
  }
  const newUser  = User.from({name, email, pwdHash, phone})
  await UserRepo.add(newUser);
  return newUser;
}


// **** Export default **** //

export default {
  login,
  register,
  me,
} as const;
