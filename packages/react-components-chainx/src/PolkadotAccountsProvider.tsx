import React, {createContext, FC, useState} from 'react';
import { useAllAccounts } from '@polkadot/react-hooks-chainx/useAllAccounts';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { useLocalStorage } from '@polkadot/react-hooks-chainx';

export interface AccountContextData {
  currentAccount: string,
  changeAccount: (account: string) => void;
}

export interface PolkadotAccountsData {
  accountAddress: string[],
  hasAccounts: boolean,
  allAccounts: InjectedAccountWithMeta[],
  isLoading: boolean;
  setLoading: React.Dispatch<boolean>,
  currentAccount: string,
  addressAndName: object[]
}

export const PolkadotAccountsContext = createContext<PolkadotAccountsData>({} as PolkadotAccountsData);

export const PolkadotAccountsProvider: FC = ({children}) => {

  const [isLoading, setLoading] = useState<boolean>(false)
  const { accountAddress, addressAndName, hasAccounts, allAccounts } = useAllAccounts()
  
  const [storedValue] = useLocalStorage<string>('currentAccount', '');
  const [currentAccount, setAccount] = useState<string>(storedValue);
  
  function changeAccount(account: string) {
    setAccount(account);
  }


  return (
    <PolkadotAccountsContext.Provider value={{
      accountAddress,
      addressAndName,
      hasAccounts,
      allAccounts,
      isLoading,
      setLoading,
      changeAccount,
      currentAccount,
     
    }}>
      {children}
    </PolkadotAccountsContext.Provider>
  );
};
