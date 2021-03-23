import React, {createContext, FC, useState} from 'react';
import usePlatonAccounts from '@polkadot/react-hooks-chainx/usePlatonAccounts';
import useTokenTransferList, { PublishRecord, RedreemRecord, Transfer } from '@polkadot/app-accounts-chainx/useTransferList';

export interface PlatonAccountsProviderData {
  platonAccounts: string[],
  platonSelectedAccount: string,
  hasPlatonAccount: boolean,
  platonAccount: string,
  setPlatonAccount: React.Dispatch<string>,
  PublishRecords: PublishRecord[],
  RedreemRecords: RedreemRecord[],
  Transfers: Transfer[],
}

export const PlatonAccountsContext = createContext<PlatonAccountsProviderData>({} as PlatonAccountsProviderData);

export const PlatonAccountsProvider: FC = ({children}) => {
  const {platonAccounts, platonSelectedAccount, hasPlatonAccount} = usePlatonAccounts();
  const [platonAccount, setPlatonAccount] = useState<string>('');

  if(typeof window.alaya !== 'undefined'){
    alaya.on('accountsChanged', function (accounts: string[]) {
      setPlatonAccount(accounts[0]);
    })
  }
  const { PublishRecords,Transfers,RedreemRecords } = useTokenTransferList('atp18hqda4eajphkfarxaa2rutc5dwdwx9z5vy2nmh');

  return (
    <PlatonAccountsContext.Provider value={{
      platonAccounts,
      platonSelectedAccount,
      hasPlatonAccount,
      platonAccount,
      setPlatonAccount,
      PublishRecords,
      RedreemRecords,
      Transfers,
    }}>
      {children}
    </PlatonAccountsContext.Provider>
  );
};
