import React, {useContext, useEffect, useState} from 'react';
// import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import Network from "./icons/network.svg";
import polkadot from "./icons/logo_polkadot.svg";
import samurai from './icons/logo_samurai.svg'
import PlantonAcc from "./icons/planton_account.svg";
import Endpoints from "@polkadot/react-components-chainx/Endpoints";
import Card from "@polkadot/react-components-chainx/Card/Card";
import AccountCard from "@polkadot/react-components-chainx/AccountCard/AccountCard";
import { useAllAccounts } from "@polkadot/react-hooks-chainx/useAllAccounts";
import { AccountContext } from "@polkadot/react-components-chainx/AccountProvider";
import { useApi } from "@polkadot/react-hooks";
import BN from 'bn.js';
import {erc20_minter_contract} from '@polkadot/pages/contract';

interface Props {
  className?: string;
}

function Header({ className }: Props): React.ReactElement<Props> {
    //   const { t } = useTranslation();
  const { api, isApiReady } = useApi();
  const [accountMsg, setAccountMsg] = useState<object>()
  const [usableBalance, setUsableBalance] = useState<number>(0)
  const { hasAccounts, allAccounts} = useAllAccounts()

  const { currentAccount } = useContext(AccountContext);
  const [pdot, setPdot] = useState<number>(0)

  useEffect(() => {
    const accountMsgs = allAccounts?.find(item => item.account === currentAccount)
    const findName = accountMsgs?.accountName
    setAccountMsg(findName)
    async function balances() {
      const { data: balance } = await api.query.system.account(currentAccount);
      const allBalance = JSON.parse(JSON.stringify(balance))
      const bgFree = new BN(allBalance.free)
      setUsableBalance(bgFree.sub(new BN(allBalance.miscFrozen)).toNumber())
      // setBalaced(allBalance)
    }

    balances()
  }, [currentAccount,isApiReady])

  useEffect(() => {
    erc20_minter_contract.methods.balanceOf(alaya.selectedAddress).call()
      .then(setPdot)
  }, [alaya.selectedAddress])

  const [platonAccount, setPlatonAccount] = useState<string[]>()

  const openSamurai = () => {
    alaya.request({ method: "platon_requestAccounts" })
      .then((platonAccounts: string[]) => setPlatonAccount(platonAccounts))
  }

  console.log('platonAccount', platonAccount)
  console.log('alaya.selectedAccount', alaya.selectedAccount)
  return (
    <div className={className}>
      <h2>欢迎来到 Platdot！</h2>
      <div className="cardListWrapper">
        {
          hasAccounts?
            <AccountCard
              className="pinkCard"
              accountName={accountMsg}
              accountAdress={currentAccount}
              accountAmount={usableBalance}
              iconNode={PlantonAcc}
              allAccounts={allAccounts}
              unit='DOT'
            /> :
            <Card isBasic className="pinkCard" label="使用 Polkadot{.js} 插件登录 Polkadot 账户" iconNode={polkadot} />
        }
        { platonAccount?
        <AccountCard
          className="grennCard"
          accountName="PlatON 账户"
          accountAdress={alaya.selectedAddress}
          accountAmount= {pdot? pdot: 0}
          iconNode={PlantonAcc}
          allAccounts={platonAccount}
          unit='PDOT
        />:
          <Card isBasic className="grennCard" label="使用 Samurai 插件登录 Platon 账户" iconNode={samurai} onClick={openSamurai} />
        }
        <Endpoints className="blueCard" iconNode={Network} title="当前网络" content="PlatON 网络" btnLabel="切换网络" />
      </div>
    </div>
  );
}

export default React.memo(styled(Header)`
  flex-grow: 1;
  overflow: hidden auto;
  padding: 2.5rem 3rem 1rem 3rem;
  width: 100%;

  h2 {
    font-size: 32px;
    font-weight: bold;
    color: #444c5e;
    line-height: 48px;

  }
  .cardListWrapper {
    display: inline-flex;
    width: 100%;

      margin-right: 20px;

        padding: 20px 0;
      }
    }
  }


`);
