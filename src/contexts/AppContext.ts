import * as React from "react";
import { SecurityLoginResponse } from "../apiClient";

export interface AppState {
  user: SecurityLoginResponse | undefined;
}

export interface Context {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

export const defaultState: AppState = {
  user: undefined,
};

const defaultSetState = () => undefined;

export const AppContext = React.createContext<Context>({
  state: defaultState,
  setState: defaultSetState,
});
