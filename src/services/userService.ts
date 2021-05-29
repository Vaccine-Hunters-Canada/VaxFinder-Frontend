import { SecurityLoginResponse } from "../apiClient";

export const createUserService = () => {
  const memoized = new Map();
  const key = "VACCINE_HUNTER_USER";

  return {
    clear: () => {
      memoized.clear();
      sessionStorage.clear();
    },
    getItem: () => {
      if (memoized.has(key)) {
        return memoized.get(key);
      }

      const json = sessionStorage.getItem(key);
      memoized.set(
        key,
        json ? (JSON.parse(json) as SecurityLoginResponse) : null,
      );
      return memoized.get(key);
    },
    checkIsAuthenticated: () => !!sessionStorage.getItem(key),
    setItem: (item: SecurityLoginResponse) => {
      memoized.set(key, item);
      sessionStorage.setItem(key, JSON.stringify(item));
    },
    removeItem: () => {
      memoized.delete(key);
      sessionStorage.removeItem(key);
    },
  };
};

export const userService = createUserService();
