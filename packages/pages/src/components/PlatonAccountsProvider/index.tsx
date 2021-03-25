import React, { createContext, FC, useEffect, useState } from 'react';
import usePlatonAccounts from '@polkadot/pages/hooks/usePlatonAccounts';
import useTokenTransferList, { PublishRecord, RedeemRecord, Transfer } from '@polkadot/pages/hooks/useTransferList';
import { erc20_minter_contract } from '@polkadot/pages/contract';
import { interval, of, Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

export interface PlatonAccountsProviderData {
  platonAccounts: string[];
  platonSelectedAccount: string;
  hasPlatonAccount: boolean;
  platonAccount: string;
  setPlatonAccount: React.Dispatch<string>;
  PublishRecords: PublishRecord[];
  RedeemRecords: RedeemRecord[];
  Transfers: Transfer[];
  pdotAmount: number;
  setPdotAmount: React.Dispatch<number>;
}

export const PlatonAccountsContext = createContext<PlatonAccountsProviderData>({} as PlatonAccountsProviderData);

export const PlatonAccountsProvider: FC = ({children}) => {
  const {platonAccounts, platonSelectedAccount, hasPlatonAccount} = usePlatonAccounts();
  const [platonAccount, setPlatonAccount] = useState<string>(platonSelectedAccount);
  const [pdotAmount, setPdotAmount] = useState<number>(0);
  const {PublishRecords, Transfers, RedeemRecords} = useTokenTransferList(platonAccount);

  // @ts-ignore
  if (typeof window.alaya !== 'undefined') {
    // @ts-ignore
    alaya.on('accountsChanged', function (accounts: string[]) {
      setPlatonAccount(accounts[0]);
    });
  }

  useEffect(() => {
    // @ts-ignore
    if (typeof window.alaya !== 'undefined') {
      // @ts-ignore
      alaya.request({method: 'platon_requestAccounts'})
        .then((platonAccounts: string[]) => setPlatonAccount(platonAccounts[0]));
    }
  }, [platonAccount]);

  useEffect(() => {
    if (platonAccount) {
      erc20_minter_contract.methods.balanceOf(platonAccount).call()
        .then(setPdotAmount);
    }
  }, [platonAccount]);

  useEffect(() => {
    // const account$ = of(platonAccount).pipe(filter(a => a.length > 0)).subscribe(console.log)
    const balance$: Subscription = interval(1000).pipe(
      switchMap(() => {
        return fromPromise(erc20_minter_contract.methods.balanceOf(platonAccount).call());
      })
    ).subscribe(amount => setPdotAmount(amount as number));

    return () => balance$.unsubscribe();
  }, [pdotAmount, platonAccounts]);

  return (
    <PlatonAccountsContext.Provider value={{
      platonAccounts,
      platonSelectedAccount,
      hasPlatonAccount,
      platonAccount,
      setPlatonAccount,
      PublishRecords,
      RedeemRecords,
      Transfers,
      pdotAmount,
      setPdotAmount,
    }}>
      {children}
    </PlatonAccountsContext.Provider>
  );
};
