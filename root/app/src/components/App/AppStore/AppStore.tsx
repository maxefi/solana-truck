import { createContext, PropsWithChildren, ReactElement, useContext } from 'react';

import { DEFAULT_APP_STORE } from './AppStore.constants';
import { AppStore, AppStoreProviderProps } from './AppStore.interface';

const AppStoreContext = createContext<AppStore>(DEFAULT_APP_STORE);

export function AppStoreProvider(props: PropsWithChildren<AppStoreProviderProps>): ReactElement {
  const { store = DEFAULT_APP_STORE, children } = props;

  return (
    <AppStoreContext.Provider
      value={Object.freeze<AppStore>({
        baseAccount: store.baseAccount,
        provider: store.provider,
        program: store.program,
      })}
    >
      {children}
    </AppStoreContext.Provider>
  );
}

export const useAppStore = (): AppStore => useContext<AppStore>(AppStoreContext);
