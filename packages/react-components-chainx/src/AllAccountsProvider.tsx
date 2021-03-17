import React, {createContext, FC, useContext, useEffect, useState} from 'react';
import { useAllAccounts } from '@polkadot/react-hooks-chainx/useAllAccounts';
import { useApi, useCall } from '@polkadot/react-hooks';
import {DeriveBalancesAll} from '@polkadot/api-derive/types';
import {web3FromAddress} from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

export interface AllAccountsData {
  accountAddress: string[],
  hasAccounts: boolean,
  allAccounts: InjectedAccountWithMeta[],
  isLoading: boolean;
  setLoading: React.Dispatch<boolean>
}

export const AllAccountsContext = createContext<AllAccountsData>({} as AllAccountsData);

export const AllAccountsProvider: FC = ({children}) => {

  const { api, isApiReady } = useApi();
  const [isLoading, setLoading] = useState<boolean>(false)
  const { accountAddress, hasAccounts, allAccounts} = useAllAccounts()
  // console.log('all',accountAddress,allAccounts,hasAccounts)

  const allBalances = useCall<DeriveBalancesAll>(isApiReady && api.derive.balances.all, [accountAddress]);
  // console.log('allBalances',JSON.stringify(allBalances) )

  // const OrderList = useOrders(currentAccount, isLoading);

  // const NowOrders = OrderList.NowOrders;
  // const HistoryOrders = OrderList.HistoryOrders;



  return (
    <AllAccountsContext.Provider value={{
      accountAddress,
      hasAccounts,
      allAccounts,
      isLoading,
      setLoading
    }}>
      {children}
    </AllAccountsContext.Provider>
  );
};
