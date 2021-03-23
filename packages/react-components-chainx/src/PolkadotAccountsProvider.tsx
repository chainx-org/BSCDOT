import React, {createContext, FC, useEffect, useState} from 'react';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { useLocalStorage } from '@polkadot/react-hooks-chainx';
import { usePolkadotAccounts } from '@polkadot/react-hooks-chainx/usePolkadotAccounts';
import useTokenTransferList, { PublishRecord, RedeemRecord, Transfer } from '@polkadot/app-accounts-chainx/useTransferList';
import all from '@polkadot/react-components/InputRpc/rpcs';


export interface PolkadotAccountsData {
  accountAddress: string[],
  hasAccounts: boolean,
  allAccounts: InjectedAccountWithMeta[],
  isLoading: boolean;
  setLoading: React.Dispatch<boolean>,
  currentAccount: string,
  addressAndName: object[],
  changeAccount: (account: string) => void,
  PublishRecords: PublishRecord[],
  RedeemRecords: RedeemRecord[],
  Transfers: Transfer[],
}

export const PolkadotAccountsContext = createContext<PolkadotAccountsData>({} as PolkadotAccountsData);

export const PolkadotAccountsProvider: FC = ({children}) => {

  const [isLoading, setLoading] = useState<boolean>(false)
  const { accountAddress, addressAndName, hasAccounts, allAccounts } = usePolkadotAccounts()
  const { PublishRecords, Transfers, RedeemRecords } = useTokenTransferList('atp18hqda4eajphkfarxaa2rutc5dwdwx9z5vy2nmh');

  const [storedValue, setValue] = useLocalStorage<string>('currentAccount');
  const [currentAccount, setAccount] = useState<string>(storedValue);
  function changeAccount(account: string) {
    setAccount(account);
  }

  useEffect(() => {
    if (!storedValue || !accountAddress.includes(currentAccount)) {
      const defaultAccount = accountAddress.length > 0 ? accountAddress[0] : ''
      setValue(defaultAccount)
      changeAccount(defaultAccount)
    }
  }, [accountAddress])

  return (
    <PolkadotAccountsContext.Provider value={{
      accountAddress,
      addressAndName,
      hasAccounts,
      allAccounts,
      isLoading,
      setLoading,
      currentAccount,
      changeAccount,
      PublishRecords,
      RedeemRecords: RedeemRecords,
      Transfers,
    }}>
      {children}
    </PolkadotAccountsContext.Provider>
  );
};
