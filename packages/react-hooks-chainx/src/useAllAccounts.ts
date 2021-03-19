// Copyright 2017-2020 @polkadot/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState, useContext } from 'react';
import { useIsMountedRef } from './useIsMountedRef';
import { web3Enable, web3Accounts ,web3AccountsSubscribe} from '@polkadot/extension-dapp';
import { useLocalStorage } from '.';
import { AccountContext } from '@polkadot/react-components-chainx/AccountProvider';
import {InjectedAccountWithMeta} from '@polkadot/extension-inject/types';
import {useApi} from '@polkadot/react-hooks';

interface useAllAccountsData {
  accountAddress: string[];
  allAccounts: InjectedAccountWithMeta[];
  hasAccounts: boolean;
  addressAndName: object[]
}

export function useAllAccounts(): useAllAccountsData {
  const mountedRef = useIsMountedRef();
  const {isApiReady} = useApi()
  const [state, setState] = useState<useAllAccountsData>({
    accountAddress: [],
    allAccounts: [],
    hasAccounts: false,
    addressAndName: []
  });
  let [storedValue, setValue] = useLocalStorage<string>('currentAccount');
  const {changeAccount} = useContext(AccountContext);

  useEffect(() => {
    async function getAddresses() {
      const extensions = await web3Enable('plat');
      if (extensions.length === 0) {
        return;
      }

      if (mountedRef.current) {

        const allAccounts = await web3AccountsSubscribe((allAccounts) => {
          const accountAddress = allAccounts.map((accounts) => { return accounts.address;});
          const addressAndName = allAccounts.map((accounts) => {
            return ({
              account: accounts.address,
              accountName: accounts.meta.name
            });

          });
          const hasAccounts = accountAddress.length !== 0;


          setState({accountAddress, addressAndName, hasAccounts, allAccounts});

        });

      }


    }
    if(isApiReady){
      getAddresses();
    }

  }, [isApiReady]);

  useEffect(() => {
    if (!storedValue) {
      const defaultAccount = state.accountAddress.length > 0 ? state.accountAddress[0] : ''
      setValue(defaultAccount)
      changeAccount(defaultAccount)

    }
  }, [state])


  return state;
}
