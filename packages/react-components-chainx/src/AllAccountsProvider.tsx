import React, {createContext, FC, useContext, useEffect, useState} from 'react';
import { useAllAccounts } from '@polkadot/react-hooks-chainx/useAllAccounts';
import { useApi } from '@polkadot/react-hooks';
import { web3FromAddress} from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';

export interface AllAccountsData {
  accountAddress: string[],
  hasAccounts: boolean,
  allAccounts: InjectedAccountWithMeta[],
  isLoading: boolean;
  setLoading: React.Dispatch<boolean>,
  currentAccount: string,
  addressAndName: object[]
}

export const AllAccountsContext = createContext<AllAccountsData>({} as AllAccountsData);

export const AllAccountsProvider: FC = ({children}) => {

  const { api, isApiReady } = useApi();
  const [isLoading, setLoading] = useState<boolean>(false)
  const { accountAddress, addressAndName, hasAccounts, allAccounts } = useAllAccounts()
  // const allBalances = useCall<DeriveBalancesAll>(isApiReady && api.derive.balances.all, [accountAddress]);

  useEffect(() => {
    async function ccc() {

      if(allAccounts.length > 0){
        try {
          console.log('allAccounts21312', allAccounts)
          const injector = await web3FromAddress(allAccounts[0].address);
          console.log(3)

          api.setSigner(injector.signer);
          api.tx.balances
            .transfer(allAccounts[1].address, 123456)
            .signAndSend(allAccounts[0].address, { signer: injector.signer }, (status) => { console.log('status',status)});
        } catch (err) {
          console.log(err);
        }
      }
    }

    ccc();

  }, [isApiReady]);
  // console.log(active);

  return (
    <AllAccountsContext.Provider value={{
      accountAddress,
      addressAndName,
      hasAccounts,
      allAccounts,
      isLoading,
      setLoading,
    }}>
      {children}
    </AllAccountsContext.Provider>
  );
};
