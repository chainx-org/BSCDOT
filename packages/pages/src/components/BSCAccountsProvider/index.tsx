import React, { createContext, FC, useEffect, useState } from 'react';
import useBSCAccounts from '@polkadot/pages/hooks/useBSCAccounts';
import useTokenTransferList, { TransferItem } from '@polkadot/pages/hooks/useTransferList';
import { erc20_minter_contract } from '@polkadot/pages/contract';
import { interval, Subscription } from '@polkadot/x-rxjs';
import { switchMap } from '@polkadot/x-rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

export interface BSCAccountsProviderData {
  hasBSCAccount: boolean;
  BSCAccount: string;
  setBSCAccount: React.Dispatch<string>;
  BSCAmount: string;
  setBSCAmount: React.Dispatch<string>;
  PublishRecords: TransferItem[];
  RedeemRecords: TransferItem[];
  Transfers: TransferItem[];
  fetchTransfers: (account: string) => void
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
        .then((balance: string) => setBSCAmount(balance));
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
