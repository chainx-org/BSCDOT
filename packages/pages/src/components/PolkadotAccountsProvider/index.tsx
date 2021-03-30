import React, {createContext, FC, useEffect, useState} from 'react';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import useLocalStorage from '@polkadot/pages/hooks/useLocalStorage';
import { usePolkadotAccounts } from '@polkadot/pages/hooks/usePolkadotAccounts';
import { useApi } from '@polkadot/react-hooks';
import BN from 'bn.js';


export interface PolkadotAccountsData {
  accountAddress: string[],
  hasAccounts: boolean,
  allAccounts: InjectedAccountWithMeta[],
  isLoading: boolean;
  setLoading: React.Dispatch<boolean>,
  currentAccount: string,
  addressAndName: object[],
  changeAccount: (account: string) => void,
  accountName: string | undefined,
  usableBalance: number,
  getPolkadotBalances: (account: string) => Promise<void>
}

export const PolkadotAccountsContext = createContext<PolkadotAccountsData>({} as PolkadotAccountsData);

export const PolkadotAccountsProvider: FC = ({children}) => {

  const [isLoading, setLoading] = useState<boolean>(false)
  const { accountAddress, addressAndName, hasAccounts, allAccounts } = usePolkadotAccounts()
  const {api, isApiReady} = useApi();
  const [accountName, setAccountName] = useState<string | undefined>('');
  const [usableBalance, setUsableBalance] = useState<number>(0);
  const [storedValue, setValue] = useLocalStorage<string>('currentAccount');
  const [currentAccount, setAccount] = useState<string>(storedValue);


  async function getPolkadotBalances(currentAccount: string) {
    if(isApiReady){
      const {data: balance} = await api.query.system.account(currentAccount);
      const allBalance = JSON.parse(JSON.stringify(balance));
      const bgFree = new BN(allBalance.free);
      setUsableBalance(bgFree.sub(new BN(allBalance.miscFrozen)).toNumber());
    }
  }

  function changeAccount(account: string) {
    setAccount(account);
  }

  useEffect(() => {
    if (!storedValue) {
      const defaultAccount = accountAddress.length > 0 ? accountAddress[0] : ''
      setValue(defaultAccount)
      changeAccount(defaultAccount)
    }
    if(accountAddress.length !== 0) {
      if(!accountAddress.includes(currentAccount)) {
        const defaultAccount = accountAddress.length > 0 ? accountAddress[0] : ''
        setValue(defaultAccount)
        changeAccount(defaultAccount)
      }
    }
  }, [accountAddress])

  useEffect(() => {
    const currentAccountInfo = allAccounts?.find(item => item.address === currentAccount);
    const currentName = currentAccountInfo?.meta.name;
    setAccountName(currentName);

    getPolkadotBalances(currentAccount);
  }, [currentAccount, isApiReady, accountName, allAccounts]);

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
      accountName,
      usableBalance,
      getPolkadotBalances
    }}>
      {children}
    </PolkadotAccountsContext.Provider>
  );
};
