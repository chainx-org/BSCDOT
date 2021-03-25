// Copyright 2017-2020 @polkadot/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';
import { useIsMountedRef } from '@polkadot/react-hooks';
import { web3Enable, web3AccountsSubscribe} from '@polkadot/extension-dapp';
import {InjectedAccountWithMeta} from '@polkadot/extension-inject/types';
import {useApi} from '@polkadot/react-hooks';

interface usePolkadotAccountsData {
  accountAddress: string[];
  allAccounts: InjectedAccountWithMeta[];
  hasAccounts: boolean;
  addressAndName: object[]
}

export function usePolkadotAccounts(): usePolkadotAccountsData {
  const mountedRef = useIsMountedRef();
  const {isApiReady} = useApi()
  const [state, setState] = useState<usePolkadotAccountsData>({
    accountAddress: [],
    allAccounts: [],
    hasAccounts: false,
    addressAndName: []
  });

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

  return state;
}
