import React, {useEffect, useState} from 'react';
import AccountCard from '@polkadot/react-components-chainx/AccountCard/AccountCard';
import PlantonAcc from '@polkadot/pages/components/Header/icons/planton_account.svg';
import Card from '@polkadot/react-components-chainx/Card/Card';
import samurai from '@polkadot/pages/components/Header/icons/logo_samurai.svg';
import {erc20_minter_contract} from '@polkadot/pages/contract';

function PlatonAccount() {
  const [pdot, setPdot] = useState<number>(0);
  const [platonAccount, setPlatonAccount] = useState<string>('');
  // const [platonAccountList, setPlatonAccountList] = useState<string[]>([])


  useEffect(() => {
    setPlatonAccount(alaya.selectedAddress);

    if (alaya.selectedAddress) {
      erc20_minter_contract.methods.balanceOf(alaya.selectedAddress).call()
        .then(setPdot);
    }


  }, [alaya.selectedAddress]);
  console.log(alaya.selectedAddress);


  const openSamurai = () => {
    alaya.request({method: 'platon_requestAccounts'})
      .then((platonAccounts: string[]) => setPlatonAccount(platonAccounts));
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
          allAccounts={[]}
          unit='PDOT'
        /> :
        <Card isBasic className="grennCard" label="使用 Samurai 插件登录 Platon 账户" iconNode={samurai}
              onClick={openSamurai}/>

      }
    </>
  );
}

export default PlatonAccount;
