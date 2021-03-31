import React, { useContext } from 'react';
import AccountCard from '@polkadot/pages/components/AccountCard';
import PlantonAccountLogo from '@polkadot/pages/components/Header/icons/symbol-platNO.svg';
import AlayaAccountLogo from '@polkadot/pages/components/Header/icons/symbol-alaya.svg';
import Card from '../Card';
import samurai from '@polkadot/pages/components/Header/icons/logo_samurai.svg';
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
      window.location.href = 'https://github.com/AlayaNetwork/Samurai/releases/download/v8.0.11/samurai-chrome-8.0.11.zip';
    }
  };

  return (
    <>
      {platonAccount ?
        <AccountCard
          className="greenCard"
          accountName={isAlaya? t('Alaya account'): t('Platon account')}
          accountAddress={platonAccount}
          accountAmount={pdotAmount ? pdotAmount : 0}
          iconNode={netWork.name.trim() === 'Alaya 网络' ? AlayaAccountLogo : PlantonAccountLogo}
          unit={platonUnit}
          accountType='platon'
        /> :
        <Card isBasic className="greenCard" label={t('Sign in your Platon account with the Samurai plugin')} iconNode={samurai}
              onClick={openSamurai}/>
      }
    </>
  );
}

export default PlatonAccount;
