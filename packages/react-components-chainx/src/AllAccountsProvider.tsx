import useAsksBids from '@polkadot/react-hooks-chainx/useAsksBids';
import React, {createContext, FC, useContext, useEffect, useState} from 'react';
import useFills from '@polkadot/react-hooks-chainx/useFills';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';
import useOrders from '@polkadot/react-hooks-chainx/useOrders';
import {StatusContext} from '@polkadot/react-components';
import { useAllAccounts } from '@polkadot/react-hooks-chainx/useAllAccounts';
import { useApi, useCall } from '@polkadot/react-hooks';
import {DeriveBalancesAll} from '@polkadot/api-derive/types';

interface Ask {
  '_id': string,
  'pairId': number,
  'price': number,
  'amount': number,
  'isAsk': boolean
}

interface Bid extends Ask {}

interface NowOrder {
  createdAt: number;
  id: number;
  pairId: number;
  price: number;
  amount: number;
  side: 'Sell' | 'Buy';
}

interface HistoryOrder {
  tradingHistoryIdx: number;
  turnover: number;
  price: number;
  pairId: number;
  blockTime: number;
}

export interface AllAccountsData {
  // fills: Fill[],
  // Asks: Ask[],
  // Bids: Bid[],
  // NowOrders: NowOrder[];
  // HistoryOrders: HistoryOrder[];
  isLoading: boolean;
  setLoading: React.Dispatch<boolean>
}

export const AllAccountsContext = createContext<AllAccountsData>({} as AllAccountsData);

export const AllAccountsProvider: FC = ({children}) => {
  
  const { api, isApiReady } = useApi();
  const [isLoading, setLoading] = useState<boolean>(false)
  const {currentAccount} = useContext(AccountContext);
  const { accountAddress, hasAccounts, allAccounts} = useAllAccounts()
  console.log('all',accountAddress,allAccounts,hasAccounts)
  
  const allBalances = useCall<DeriveBalancesAll>(isApiReady && api.derive.balances.all, [accountAddress]);
  console.log('allBalances',JSON.stringify(allBalances) ) 

  // const OrderList = useOrders(currentAccount, isLoading);

  // const NowOrders = OrderList.NowOrders;
  // const HistoryOrders = OrderList.HistoryOrders;

  // useEffect(() => {
  //   setLoading(false)
  // },[OrderList])

  return (
    <AllAccountsContext.Provider value={{
 
      isLoading,
      setLoading
    }}>
      {children}
    </AllAccountsContext.Provider>
  );
};
