import { INewUser, ISessionUser, isSessionUser } from "chore-scheduler-common";
import { createContext, useState, useContext } from "react";
import AuthService from "../services/auth.service";
import axios, { AxiosError } from "axios";

interface IAuthContext {
    user: ISessionUser | null;
    error: string | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    register: (newUser: INewUser) => Promise<void>;
    autoSignIn: () => Promise<ISessionUser>;
}
const authContext = createContext<IAuthContext | null>(null);

export const useAuth = () => {
  const auth = useContext(authContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
}

export function ProvideAuth({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useProvideAuth(): IAuthContext{
  const [user, setUser] = useState<ISessionUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function login(username: string, password: string) {
    setLoading(true);
    try {
      try {
        const user = await AuthService.login(username, password);
      } catch (err) { }
    } finally {
      return setLoading(false);
    }
  }

  function logout() {
    AuthService.logout();
    setUser(null);
  }

  async function register(
    newUser: INewUser
  ) {
    setLoading(true);
        const sessionUser = await AuthService.register(newUser).then((sessionUser) => {
        setUser(sessionUser);
    }).catch((err: AxiosError) => {
      //setError(err.response?.data?.message || err.message);
    }).finally(() => {
      setLoading(false);
    });
  }

  function autoSignIn() {
    setLoading(true);
    return AuthService.autoSignIn().then((sessionUser) => {
      isSessionUser(sessionUser) && setUser(sessionUser);
      return sessionUser;
    }).finally(() => setLoading(false));

  }

  return {
    user,
    error,
    loading,
    login,
    logout,
    register,
    autoSignIn,
    } as IAuthContext;

}