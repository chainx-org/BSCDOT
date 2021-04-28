import React, { createContext, FC, useEffect, useState } from 'react';
import useBSCAccounts from '@polkadot/pages/hooks/useBSCAccounts';
import useTokenTransferList, { PublishRecord, RedeemRecord, Transfer } from '@polkadot/pages/hooks/useTransferList';
import { erc20_minter_contract } from '@polkadot/pages/contract';
import { interval, of, Subscription } from '@polkadot/x-rxjs';
import { filter, switchMap } from '@polkadot/x-rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

export interface BSCAccountsProviderData {
  hasBSCAccount: boolean;
  BSCAccount: string;
  setBSCAccount: React.Dispatch<string>;
  BSCAmount: string;
  setBSCAmount: React.Dispatch<string>;
  PublishRecords: PublishRecord[];
  RedeemRecords: RedeemRecord[];
  Transfers: Transfer[];
  fetchTransfers: (account: string) => Promise<void>
}

export const BSCAccountsContext = createContext<BSCAccountsProviderData>({} as BSCAccountsProviderData);

export const BSCAccountsProvider: FC = ({children}) => {
  const {BSCSelectedAccount, hasBSCAccount} = useBSCAccounts();
  const [BSCAccount, setBSCAccount] = useState<string>(BSCSelectedAccount);
  const [BSCAmount, setBSCAmount] = useState<string>('0');
  const { state, fetchTransfers } = useTokenTransferList(BSCAccount);
  const { PublishRecords, Transfers, RedeemRecords } = state
  // @ts-ignore
  if (typeof window.ethereum !== 'undefined') {
    // @ts-ignore
    ethereum.on('accountsChanged', function (accounts: string[]) {
      setBSCAccount(accounts[0]);
    });
  }

  useEffect(() => {
    // @ts-ignore
    if (typeof window.ethereum !== 'undefined') {
      // @ts-ignore
      ethereum.request({method: 'eth_requestAccounts'})
        .then((Accounts: string[]) => setBSCAccount(Accounts[0]));
    }
  }, []);

  useEffect(() => {
    if (BSCAccount) {
      erc20_minter_contract.methods.balanceOf(BSCAccount).call()
        .then(balance => setBSCAmount(balance));
    }
  }, [BSCAccount]);

  useEffect(() => {
    const balance$: Subscription = interval(1000).pipe(
      switchMap(() => {
        return fromPromise(erc20_minter_contract.methods.balanceOf(BSCAccount).call());
      })
    ).subscribe(amount => setBSCAmount(amount as string));

    return () => balance$.unsubscribe();
  });

  return (
    <BSCAccountsContext.Provider value={{
      hasBSCAccount,
      BSCAccount,
      setBSCAccount,
      PublishRecords,
      RedeemRecords,
      Transfers,
      BSCAmount,
      setBSCAmount,
      fetchTransfers
    }}>
      {children}
    </BSCAccountsContext.Provider>
  );
};
