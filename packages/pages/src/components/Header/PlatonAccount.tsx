import React, { useContext } from 'react';
import AccountCard from '@polkadot/pages/components/AccountCard';
import Card from '../Card';
import { PlatonAccountsContext } from '@polkadot/pages/components/PlatonAccountsProvider';
import { NetWorkContext } from '@polkadot/pages/components/NetWorkProvider';
import { jsonInterfaceMethodToString } from 'web3/packages/web3-utils';

function PlatonAccount() {
  const {platonAccount, setPlatonAccount, pdotAmount} = useContext(PlatonAccountsContext);
  const {netWork} = useContext(NetWorkContext);

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
          accountName="PlatON 账户"
          accountAddress={platonAccount}
          accountAmount={pdotAmount ? pdotAmount : 0}
          iconNode={netWork.name.trim() === 'Alaya 网络' ? 'http://lc-XLoqMObG.cn-n1.lcfile.com/df5990ab96edbde34115.svg' : 'http://lc-XLoqMObG.cn-n1.lcfile.com/49330e39b9a4631c4e0f.svg'}
          unit='PDOT'
          accountType='platon'
        /> :
        <Card isBasic className="greenCard" label="使用 Samurai 插件登录 Platon 账户" iconNode='http://lc-XLoqMObG.cn-n1.lcfile.com/2a8160e1492ced7f4b2c.svg'
              onClick={openSamurai}/>
      }
    </>
  );
}

export default PlatonAccount;
