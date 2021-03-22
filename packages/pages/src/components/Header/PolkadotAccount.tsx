import React, {useContext, useEffect, useState} from 'react';
import AccountCard from '@polkadot/react-components-chainx/AccountCard/AccountCard';
import polkadotAccount from '@polkadot/pages/components/Header/icons/polkadot_account.svg';
import Card from '@polkadot/react-components-chainx/Card/Card';
import polkadot from '@polkadot/pages/components/Header/icons/logo_polkadot.svg';
import BN from "bn.js";
import {useApi} from '@polkadot/react-hooks';
import {ApiContext} from '@polkadot/react-api';
import { PolkadotAccountsContext } from '@polkadot/react-components-chainx/PolkadotAccountsProvider';
import { usePolkadotAccounts } from '@polkadot/react-hooks-chainx/usePolkadotAccounts';


function PolkadotAccount() {
  const {api, isApiReady} = useApi();
  const [accountName, setAccountName] = useState<string | undefined>('');
  const [usableBalance, setUsableBalance] = useState<number>(0);
  const {hasAccounts, allAccounts, addressAndName} = usePolkadotAccounts();
  const {currentAccount} = useContext(PolkadotAccountsContext);
  const {formatProperties} = useContext(ApiContext)

  useEffect(() => {
    const currentAccountInfo = allAccounts?.find(item => item.address === currentAccount);
    const findName = currentAccountInfo?.meta.name;
    setAccountName(findName);

    async function balances() {
      if(isApiReady){
        const {data: balance} = await api.query.system.account(currentAccount);
        const allBalance = JSON.parse(JSON.stringify(balance));
        const bgFree = new BN(allBalance.free);
        setUsableBalance(bgFree.sub(new BN(allBalance.miscFrozen)).toNumber());
        // setBalaced(allBalance)
      }
    }

    balances();
  }, [currentAccount, isApiReady, accountName, allAccounts]);

  return (
    <>
      {
        hasAccounts ?
          <AccountCard
            className="pinkCard"
            accountName={accountName}
            accountAddress={currentAccount}
            accountAmount={usableBalance}
            iconNode={polkadotAccount}
            allAccounts={addressAndName}
            unit={formatProperties.tokenSymbol[0]}
          /> :
          <Card isBasic className="pinkCard" label="使用 Polkadot{.js} 插件登录 Polkadot 账户" iconNode={polkadot}/>
      }
    </>
  );
}

export default PolkadotAccount;
