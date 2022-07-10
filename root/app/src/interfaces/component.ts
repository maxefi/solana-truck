import { Account } from "./account";

export interface ComponentBaseProps {
  getAccount: () => Promise<Nullable<Account>>;
  setError: (error: string) => void;
}
