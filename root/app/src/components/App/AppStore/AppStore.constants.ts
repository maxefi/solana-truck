import { AppStore } from "./AppStore.interface";

export enum AppDynamicField {
  BaseAccount = "baseAccount",
  Provider = "provider",
  Program = "program",
}

export const DEFAULT_APP_STORE: AppStore = {
  baseAccount: undefined,
  provider: undefined,
  program: undefined,
};
