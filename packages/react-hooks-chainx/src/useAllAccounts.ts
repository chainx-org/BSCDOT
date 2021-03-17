// Copyright 2017-2020 @polkadot/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useContext, useEffect, useState } from 'react';
import { useIsMountedRef } from './useIsMountedRef';
import { web3AccountsSubscribe, web3Enable } from '@polkadot/extension-dapp';
import useLocalStorage from './useLocalStorage';
import { AccountContext } from '@polkadot/react-components-chainx/AccountProvider';

interface useAllAccounts {
  accountAddress: string[];
  allAccounts: object[];
  hasAccounts: boolean;
  // isAccount: (address: string) => boolean;
}

export function useAllAccounts (): useAllAccounts {
  const mountedRef = useIsMountedRef();
  const [state, setState] = useState<useAllAccounts>({ accountAddress: [], allAccounts: [], hasAccounts: false });
  let [storedValue, setValue] = useLocalStorage<string>('currentAccount');
  const { changeAccount } = useContext(AccountContext);

  useEffect(()=> {
    async function alladdress() {
      const extensions = await web3Enable('platdot');
      if (extensions.length === 0) {
        return;
      }
      const subscription = await web3AccountsSubscribe(( injectedAccounts ) => { 
     
      if (mountedRef.current) {
        const accountAddress = injectedAccounts.map(( accounts ) => { return accounts.address});
        const allAccounts = injectedAccounts.map(( accounts ) => { 
          return ({
            account: accounts.address,
            accountName: accounts.meta.name
          })
          
        });
        const hasAccounts = accountAddress.length !== 0;
        // const isAccount = (address: string): boolean => allAccounts.includes(address);
        if (storedValue === 'undefined' || storedValue === null || storedValue === undefined) {
          const defaultAccount = accountAddress.length > 0 ? accountAddress[0] : ''
          setValue(defaultAccount)
          changeAccount(defaultAccount)
        }

        setState({ accountAddress, allAccounts, hasAccounts });
      }

    });
  }
  alladdress()
 


   

  
  }, [mountedRef]);

  return state;
}
