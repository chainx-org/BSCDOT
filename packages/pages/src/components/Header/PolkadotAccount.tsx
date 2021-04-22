import React, { useContext, useEffect, useState } from 'react';
import AccountCard from '@polkadot/pages/components/AccountCard';
import Card from '../Card';
import { PolkadotAccountsContext, PolkadotAccountsData } from '@polkadot/pages/components/PolkadotAccountsProvider';
import { NetWorkContext } from '@polkadot/pages/components/NetWorkProvider';
import { isWeb3Injected } from '@polkadot/extension-dapp';
import { useApi } from '@polkadot/react-hooks';
import { useTranslation } from '@polkadot/pages/components/translate';

function PolkadotAccount(): React.ReactElement {
  const {t} = useTranslation();
  const {currentAccount, hasAccounts, accountName, usableBalance, addressAndName} = useContext<PolkadotAccountsData>(PolkadotAccountsContext);
  const {localCoin} = useContext(NetWorkContext);
  const {hasInjectedAccounts} = useApi();
  const [promptMessage, setPromptMessage] = useState(t('Sign in your Polkadot{.js} the Polkadot plugin'));

  const _clickPolkadot = (): void => {
    if (!isWeb3Injected) {
      window.location.href = 'https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd';
    }
  };

  useEffect(() => {
    if (isWeb3Injected) {
      if (!hasInjectedAccounts) {
        setPromptMessage(t('The extension is detected, please grant the plugin access to the account related permissions'));
      }
    }
  }, [isWeb3Injected, hasInjectedAccounts, t]);

  return (
    <>
      {
        hasAccounts ?
          <AccountCard
            className="pinkCard"
            accountName={accountName}
            accountAddress={currentAccount}
            accountAmount={usableBalance ? usableBalance : 0}
            iconNode={localCoin.coinName === 'KSM' ?
              'http://lc-XLoqMObG.cn-n1.lcfile.com/0267c62c6d3ebcf003c4.svg' :
              localCoin.coinName === 'XBTC' ?
                'http://lc-XLoqMObG.cn-n1.lcfile.com/e19d81cbc3ad30b636cd.svg' :
                'http://lc-XLoqMObG.cn-n1.lcfile.com/af0c6b2a22f2c51ca70d.svg'}
            allAccounts={addressAndName}
            unit={localCoin.coinName}
            accountType='polkadot'
          /> :
          <Card isBasic className="pinkCard" label={promptMessage}
                iconNode='http://lc-XLoqMObG.cn-n1.lcfile.com/86b2e36632644d5f5fdc.svg'
                onClick={_clickPolkadot}/>
      }
    </>
  );
}

export default PolkadotAccount;
