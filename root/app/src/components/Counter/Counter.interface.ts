import { Account } from "../../interfaces";

export interface CounterProps {
  getAccount: () => Promise<Nullable<Account>>;
  setError: (error: string) => void;
}
