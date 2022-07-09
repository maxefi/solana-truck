import { BaseAccount, ProgramIdl, Provider } from "../App.interface";

import { AppDynamicField } from "./AppStore.constants";

export interface AppStore {
  readonly [AppDynamicField.BaseAccount]?: BaseAccount;
  readonly [AppDynamicField.Provider]?: Provider;
  readonly [AppDynamicField.Program]?: ProgramIdl;
}

export interface AppStoreProviderProps {
  store?: AppStore;
}
