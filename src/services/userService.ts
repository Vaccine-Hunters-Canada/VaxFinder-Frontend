import { SecurityLoginResponse } from "../apiClient";

export const createUserService = () => {
  const memoized = new Map();
  const key = "VACCINE_HUNTER_USER";

  return {
    getUser: (): SecurityLoginResponse => {
      if (memoized.has(key)) {
        return memoized.get(key);
      }

      const json = sessionStorage.getItem(key);
      memoized.set(
        key,
        json ? (JSON.parse(json) as SecurityLoginResponse) : null,
      );
      return memoized.get(key) as SecurityLoginResponse;
    },
    checkIsAuthenticated: () => !!sessionStorage.getItem(key),
    setUser: (item: SecurityLoginResponse) => {
      memoized.set(key, item);
      sessionStorage.setItem(key, JSON.stringify(item));
    },
    removeUser: () => {
      memoized.delete(key);
      sessionStorage.removeItem(key);
    },
  };
};

export const userService = createUserService();
