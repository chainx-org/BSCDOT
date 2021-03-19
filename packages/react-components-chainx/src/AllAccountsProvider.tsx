import React, {createContext, FC, useState} from 'react';
import { useAllAccounts } from '@polkadot/react-hooks-chainx/useAllAccounts';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

export interface AllAccountsData {
  accountAddress: string[],
  hasAccounts: boolean,
  allAccounts: InjectedAccountWithMeta[],
  isLoading: boolean;
  setLoading: React.Dispatch<boolean>,
  currentAccount: string,
  addressAndName: object[]
}

export const AllAccountsContext = createContext<AllAccountsData>({} as AllAccountsData);

export const AllAccountsProvider: FC = ({children}) => {

  const [isLoading, setLoading] = useState<boolean>(false)
  const { accountAddress, addressAndName, hasAccounts, allAccounts } = useAllAccounts()

  return (
    <AllAccountsContext.Provider value={{
      accountAddress,
      addressAndName,
      hasAccounts,
      allAccounts,
      isLoading,
      setLoading,
    }}>
      {children}
    </AllAccountsContext.Provider>
  );
};
