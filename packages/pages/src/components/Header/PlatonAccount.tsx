import React, { useContext } from 'react';
import AccountCard from '@polkadot/pages/components/AccountCard';
import Card from '../Card';
import { BSCAccountsContext } from '@polkadot/pages/components/BSCAccountsProvider';
import { useTranslation } from '@polkadot/pages/components/translate';
import { CoinInfoContext } from '@polkadot/pages/components/CoinInfoProvider';

function PlatonAccount() {
  const {t} = useTranslation();
  const {hasBSCAccount, BSCAccount, BSCAmount, setBSCAccount} = useContext(BSCAccountsContext);
  const {coinInfo} = useContext(CoinInfoContext);

  const openMetaMask = () => {
    //@ts-ignore
    if (typeof window.ethereum !== 'undefined') {
      //@ts-ignore
      ethereum.request({method: 'eth_requestAccounts'})
        .then((Accounts: string[]) => setBSCAccount(Accounts[0]));
    } else {
      window.location.href = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
    }
  };

  return (
    <>
      {hasBSCAccount ?
        <AccountCard
          className="greenCard"
          accountName={t('BSC Account')}
          accountAddress={BSCAccount}
          accountAmount={BSCAmount ? BSCAmount : 0}
          iconNode='http://lc-XLoqMObG.cn-n1.lcfile.com/91d74a84c392f404a687.svg'
          unit={coinInfo.bCoinName}
          accountType='platon'
        /> :
        <Card isBasic className="greenCard" label={t('Sign in your BSC account with the metamask plugin')} iconNode='http://lc-XLoqMObG.cn-n1.lcfile.com/e83164f3c19d30a230cc.svg'
              onClick={openMetaMask}/>
      }
    </>
  );
}

export default PlatonAccount;
