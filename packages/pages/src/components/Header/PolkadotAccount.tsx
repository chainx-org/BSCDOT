import React, {useContext, useEffect, useState} from 'react';
import AccountCard from '@polkadot/pages/components/AccountCard';
import PolkadotAccountLogo from '@polkadot/pages/components/Header/icons/polkadot_account.svg';
import KusamaAccountLogo from '@polkadot/pages/components/Header/icons/symbol-Kusama.svg'
import Card from '../Card';
import polkadot from '@polkadot/pages/components/Header/icons/logo_polkadot.svg';
import {ApiContext} from '@polkadot/react-api';
import { PolkadotAccountsContext, PolkadotAccountsData} from '@polkadot/pages/components/PolkadotAccountsProvider';
import {ApiProps} from '@polkadot/react-api/types';
import {NetWorkContext} from '@polkadot/pages/components/NetWorkProvider';

function PolkadotAccount(): React.ReactElement {

  const {currentAccount, hasAccounts, accountName, usableBalance, addressAndName} = useContext<PolkadotAccountsData>(PolkadotAccountsContext);
  const {formatProperties} = useContext<ApiProps>(ApiContext)
  const {netWork} = useContext(NetWorkContext)

  return (
    <>
      {
        hasAccounts ?
          <AccountCard
            className="pinkCard"
            accountName={accountName}
            accountAddress={currentAccount}
            accountAmount={usableBalance? usableBalance : 0}
            iconNode={netWork.name.trim()=== 'Alaya 网络' ? KusamaAccountLogo: PolkadotAccountLogo}
            allAccounts={addressAndName}
            unit={formatProperties.tokenSymbol[0]}
            accountType= 'polkadot'
          /> :
          <Card isBasic className="pinkCard" label="使用 Polkadot{.js} 插件登录 Polkadot 账户" iconNode={polkadot}/>
      }
    </>
  );
}

export default PolkadotAccount;
