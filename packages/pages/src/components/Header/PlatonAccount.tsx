import React, {useContext, useEffect, useState} from 'react';
import AccountCard from '@polkadot/react-components-chainx/AccountCard/AccountCard';
import PlantonAccountLogo from '@polkadot/pages/components/Header/icons/symbol-platNO.svg';
import AlayaAccountLogo from '@polkadot/pages/components/Header/icons/symbol-alaya.svg'
import Card from '@polkadot/react-components-chainx/Card/Card';
import samurai from '@polkadot/pages/components/Header/icons/logo_samurai.svg';
import {PlatonAccountsContext} from '@polkadot/react-components-chainx/PlatonAccountsProvider';
import {NetWorkContext} from '@polkadot/react-components-chainx/NetWorkProvider';

function PlatonAccount() {
  const {platonAccount, setPlatonAccount, pdotAmount} = useContext(PlatonAccountsContext)
  const {netWork} = useContext(NetWorkContext)

  const openSamurai = () => {
    if(typeof window.alaya !== 'undefined'){
      alaya.request({method: 'platon_requestAccounts'})
        .then((platonAccounts: string[]) => setPlatonAccount(platonAccounts[0]));
    }else{
      window.location.href = 'https://github.com/AlayaNetwork/Samurai/releases/download/v8.0.11/samurai-chrome-8.0.11.zip'
    }
  };

  return (
    <>
      {platonAccount ?
        <AccountCard
          className="greenCard"
          accountName="PlatON 账户"
          accountAddress={platonAccount}
          accountAmount={pdotAmount ? pdotAmount : 0}
          iconNode={netWork.name.trim() === 'Alaya 网络'? AlayaAccountLogo: PlantonAccountLogo}
          unit='PDOT'
          accountType = 'platon'
        /> :
        <Card isBasic className="greenCard" label="使用 Samurai 插件登录 Platon 账户" iconNode={samurai}
              onClick={openSamurai}/>
      }
    </>
  );
}

export default PlatonAccount;
