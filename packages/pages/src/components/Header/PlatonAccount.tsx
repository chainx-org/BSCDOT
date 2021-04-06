import React, { useContext } from 'react';
import AccountCard from '@polkadot/pages/components/AccountCard';
import Card from '../Card';
import { PlatonAccountsContext } from '@polkadot/pages/components/PlatonAccountsProvider';
import { NetWorkContext } from '@polkadot/pages/components/NetWorkProvider';
import { useTranslation } from '@polkadot/pages/components/translate';

function PlatonAccount() {
  const {t} = useTranslation();
  const {platonAccount, setPlatonAccount, pdotAmount} = useContext(PlatonAccountsContext);
  const {netWork, isAlaya, platonUnit} = useContext(NetWorkContext);

  const openSamurai = () => {
    if (typeof window.alaya !== 'undefined') {
      alaya.request({method: 'platon_requestAccounts'})
        .then((platonAccounts: string[]) => setPlatonAccount(platonAccounts[0]));
    } else {
      window.location.href = isAlaya? 'https://github.com/AlayaNetwork/Samurai/raw/develop/devnet/samurai-devnet-chrome-8.0.11.zip': 'https://github.com/AlayaNetwork/Samurai/releases/download/v8.0.11/samurai-chrome-8.0.11.zip';
    }
  };

  return (
    <>
      {platonAccount ?
        <AccountCard
          className="greenCard"
          accountName={isAlaya? t('Alaya account'): t('PlatON account')}
          accountAddress={platonAccount}
          accountAmount={pdotAmount ? pdotAmount : 0}
          iconNode={netWork.name.trim() === 'Alaya' ? 'http://lc-XLoqMObG.cn-n1.lcfile.com/df5990ab96edbde34115.svg' : 'http://lc-XLoqMObG.cn-n1.lcfile.com/49330e39b9a4631c4e0f.svg'}
          unit={platonUnit}
          accountType='platon'
        /> :
        <Card isBasic className="greenCard" label={t('Sign in your Platon account with the Samurai plugin')} iconNode='http://lc-XLoqMObG.cn-n1.lcfile.com/2a8160e1492ced7f4b2c.svg'
              onClick={openSamurai}/>
      }
    </>
  );
}

export default PlatonAccount;
