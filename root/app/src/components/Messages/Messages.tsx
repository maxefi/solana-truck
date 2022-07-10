import { memo, ChangeEvent, ReactElement, useState, Fragment, useCallback } from "react";
import { SystemProgram } from "@solana/web3.js";

import { useAppStore } from "../App/AppStore/AppStore";
import { ComponentBaseProps, ErrorRpc } from "../../interfaces";
import { MessagesStateProps } from "./Messages.interface";
import { MessagesCurrentStyled } from "./Messages.styles";
import { Loader } from "../Loader";

const Messages = ({ getAccount, setError }: ComponentBaseProps): ReactElement => {
  const { baseAccount, provider, program } = useAppStore();

  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<MessagesStateProps>({
    current: '',
    history: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isConfigured = baseAccount && program && provider;

  async function initializeHandler(): Promise<void> {
    try {
      if (isConfigured) {
        setIsLoading(true);

        await program.rpc.initialize('hello world', {
          accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
          },
          signers: [baseAccount],
        });

        const account = await getAccount();

        if (account) {
          setMessages({
            ...messages,
            current: account.data.toString(),
            history: account.dataList,
          });
        }
      }
    } catch (error) {
      console.log("Transaction error while INITIALIZING messages: ", error);
      setError((error as ErrorRpc).error.errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateHandler(): Promise<void> {
    try {
      if (isConfigured && input) {
        setIsLoading(true);

        await program?.rpc.update(input, {
          accounts: {
            baseAccount: baseAccount.publicKey,
          },
        });

        const account = await getAccount();

        if (account) {
          setMessages({
            ...messages,
            current: account.data.toString(),
            history: account.dataList,
          });
        }
      }
    } catch (error) {
      console.log("Transaction error while UPDATING messages: ", error);
      setError((error as ErrorRpc).error.errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  const onMessagesCurrentChangeHandler = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>): void => setInput(target.value),
    [],
  );

  if (!messages.current) {
    return (
      <Fragment>
        <h3>
          Please initialize messages 
          {isLoading && <Loader />}
        </h3>
        <button onClick={initializeHandler}>Initialize messages</button>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <MessagesCurrentStyled>
        {messages.current}
        {isLoading && <Loader />}
      </MessagesCurrentStyled>
      <input
        type="text"
        placeholder="Add new message"
        onChange={onMessagesCurrentChangeHandler}
        value={input}
      />
      <button onClick={updateHandler}>Add message</button>
      {messages.history.map((message, index) => <h4 key={`message-${index}`}>{message}</h4>)}
    </Fragment>
  );
}

export default memo(Messages);