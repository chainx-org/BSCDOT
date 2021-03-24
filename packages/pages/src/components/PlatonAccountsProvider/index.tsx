import React, {createContext, FC, useEffect, useState} from 'react';
import usePlatonAccounts from '@polkadot/pages/hooks/usePlatonAccounts';
import useTokenTransferList, { PublishRecord, RedeemRecord, Transfer } from '@polkadot/pages/hooks/useTransferList';
import {erc20_minter_contract} from '@polkadot/pages/contract';

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
  setN: React.Dispatch<number>
}

export const PlatonAccountsContext = createContext<PlatonAccountsProviderData>({} as PlatonAccountsProviderData);

export const PlatonAccountsProvider: FC = ({children}) => {
  const {platonAccounts, platonSelectedAccount, hasPlatonAccount} = usePlatonAccounts();
  const [platonAccount, setPlatonAccount] = useState<string>('');
  const [pdotAmount, setPdotAmount] = useState<number>(0)
  const { PublishRecords,Transfers, RedeemRecords } = useTokenTransferList(platonAccount);
  const [n, setN] = useState<number>(0)

  if(typeof window.alaya !== 'undefined'){
    alaya.on('accountsChanged', function (accounts: string[]) {
      setPlatonAccount(accounts[0]);
    })
  }

  useEffect(() => {
    if(typeof window.alaya !== 'undefined'){
      alaya.request({method: 'platon_requestAccounts'})
        .then((platonAccounts: string[]) => setPlatonAccount(platonAccounts[0]));
    }
  }, [])

  useEffect(() => {
    if (platonAccount) {
      erc20_minter_contract.methods.balanceOf(platonAccount).call()
        .then(setPdotAmount);
    }
  }, [platonAccount, n]);

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
      setN
    }}>
      {children}
    </PlatonAccountsContext.Provider>
  );
};
