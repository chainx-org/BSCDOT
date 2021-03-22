import React, {createContext, FC, useEffect, useState} from 'react';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { useLocalStorage } from '@polkadot/react-hooks-chainx';
import { usePolkadotAccounts } from '@polkadot/react-hooks-chainx/usePolkadotAccounts';

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
  const { accountAddress, addressAndName, hasAccounts, allAccounts } = usePolkadotAccounts()
  
  const [storedValue, setValue] = useLocalStorage<string>('currentAccount', '');
  const [currentAccount, setAccount] = useState<string>(storedValue);

  function changeAccount(account: string) {
    setAccount(account);
  }
  
  if (!storedValue) {
    const defaultAccount = accountAddress.length > 0 ? accountAddress[0] : ''
    setValue(defaultAccount)
    changeAccount(defaultAccount)
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
