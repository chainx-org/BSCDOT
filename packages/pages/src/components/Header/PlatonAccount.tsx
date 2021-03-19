import React, {useContext, useEffect, useState} from 'react';
import AccountCard from '@polkadot/react-components-chainx/AccountCard/AccountCard';
import PlantonAcc from '@polkadot/pages/components/Header/icons/planton_account.svg';
import Card from '@polkadot/react-components-chainx/Card/Card';
import samurai from '@polkadot/pages/components/Header/icons/logo_samurai.svg';
import {erc20_minter_contract} from '@polkadot/pages/contract';
import {PlatonAccountsContext} from '@polkadot/react-components-chainx/PlatonAccountsProvider';

function PlatonAccount() {
  const [pdot, setPdot] = useState<number>(0);
  const {platonAccount, setPlatonAccount} = useContext(PlatonAccountsContext)

  useEffect(() => {
    if(typeof window.alaya !== 'undefined'){
      alaya.request({method: 'platon_requestAccounts'})
        .then((platonAccounts: string[]) => setPlatonAccount(platonAccounts[0]));
    }
  }, [])

  useEffect(() => {
    if (platonAccount) {
      erc20_minter_contract.methods.balanceOf(platonAccount).call()
        .then(setPdot);
    }
  }, [platonAccount]);

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
          className="grennCard"
          accountName="PlatON 账户"
          accountAddress={platonAccount}
          accountAmount={pdot ? pdot : 0}
          iconNode={PlantonAcc}
          unit='PDOT'
        /> :
        <Card isBasic className="grennCard" label="使用 Samurai 插件登录 Platon 账户" iconNode={samurai}
              onClick={openSamurai}/>
      }
    </>
  );
}

export default PlatonAccount;
