// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0
import {ToolTipConfig} from '@polkadot/react-components-chainx/ToolTipConfig/ToolTipConfig';
import Button from '@polkadot/react-components-chainx/Button';
// import type { Route } from '@polkadot/apps-routing/types';
import {Route} from 'react-router-dom';

import React, {useContext, useEffect} from 'react';
// import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
// import createRoutes from '@polkadot/apps-routing';
// import { ErrorBoundary, Spinner, StatusContext } from '@polkadot/react-components';
// import { useApi } from '@polkadot/react-hooks';

// import { findMissingApis } from '../endpoint';
// import { useTranslation } from '../translate';
import Lpolkadot from './icons/logo_polkadot.svg';
import samurai from './icons/logo_samurai.svg';
import Network from './icons/network.svg';

import polkadot from './icons/logo_polkadot.svg';
import PolkadotAcc from './icons/polkadot_account.svg';
import PlantonAcc from './icons/planton_account.svg';
import Endpoints from '@polkadot/react-components-chainx/Endpoints';
import Pdotcard from '@polkadot/react-components-chainx/PdotCards/Pdotcard';
import Card from '@polkadot/react-components-chainx/Card/Card';
import AccountCard from '@polkadot/react-components-chainx/AccountCard/AccountCard';
import {Records} from '@polkadot/react-components-chainx/Records';

import {DeriveBalancesAll} from '@polkadot/api-derive/types';
import {useAccountInfo, useApi, useCall} from '@polkadot/react-hooks';
import {api} from '@polkadot/react-api';
import {web3AccountsSubscribe, web3Enable, web3FromAddress} from '@polkadot/extension-dapp';
import {useAllAccounts} from '@polkadot/react-hooks-chainx/useAllAccounts';
import {useLocalStorage} from '@polkadot/react-hooks-chainx';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';

interface Props {
  className?: string;
}


function TransferContent({className}: Props): React.ReactElement<Props> {
  //   const { t } = useTranslation();
  // const { api, isApiReady } = useApi();
  const {accountAddress, hasAccounts, allAccounts} = useAllAccounts();

  // const allBalances = useCall<DeriveBalancesAll>(isApiReady && api.derive.balances.all, [currentAccount]);
  // console.log('allBalances',JSON.stringify(allBalances) )

  return (
    <div className={className}>
      <div className="contentWrapper">
        <h2>欢迎来到 Platdot！</h2>
        <div className="cardListWrapper">
          <div className="left">
            <div className="cardList">
              <>
                {
                  hasAccounts ?
                    <AccountCard
                      className='pinkCard'
                      accountName='Merrile Burgett'
                      accountAdress='12BPUMLYobYiBjPuRCnNd9xZcEAjzXYM5Vjweaa327YwD8FA'
                      accountAmount='99999.0000'
                      iconNode={PolkadotAcc}
                    /> :
                    <Card
                      isBasic
                      className="pinkCard"
                      label="使用 Polkadot{.js} 插件登录 Polkadot 账户"
                      iconNode={polkadot}
                    />
                }
              </>
              <AccountCard
                className="grennCard"
                accountName="PlatON 账户"
                accountAdress="atpPUMLYobYiBjPuRCnNd9xZcEAjzXYM5Vjweaa327YwD8FA"
                accountAmount="99999.0000"
                iconNode={PlantonAcc}
              />
              <Card
                isBasic
                className='pinkCard'
                label='使用 Polkadot{.js} 插件登录 Polkadot 账户'
                iconNode={polkadot}
              />
              {/* <AccountCard
              className='pinkCard'
              accountName='Merrile Burgett'
              accountAdress='12BPUMLYobYiBjPuRCnNd9xZcEAjzXYM5Vjweaa327YwD8FA'
              accountAmount='99999.0000'
              iconNode={PolkadotAcc}
            />
              {/*<AccountCard*/}
              {/*  className="grennCard"*/}
              {/*  accountName="PlatON 账户"*/}
              {/*  accountAdress="atpPUMLYobYiBjPuRCnNd9xZcEAjzXYM5Vjweaa327YwD8FA"*/}
              {/*  accountAmount="99999.0000"*/}
              {/*  iconNode={PlantonAcc}*/}
              {/*/>*/}
              <Card
                isBasic
                className='grennCard'
                label='使用 Samurai 插件登录 PlatON 账户'
                iconNode={samurai}
              />
            </div>
            <div>
              {/* <Pdotcard noData={true} title='发行 PDOT' isBasic noDataMsg='请先登录 Polkadot 和 PlatON 账户' /> */}

              <Route exact path="/">
                <Pdotcard title="发行 PDOT" component="PublishCard" isBasic/>
              </Route>
              <Route exact path="/redeem">
                <Pdotcard title="赎回 PDOT" component="RedeemCard" isBasic/>
              </Route>
              <Route exact path="/transfer">
                <Pdotcard title="PDOT 转账" component="TransferCard" isBasic/>
              </Route>
            </div>
          </div>
          <div className="right">
            <Endpoints
              className="blueCard"
              iconNode={Network}
              title="当前网络"
              content="PlatON 网络"
              btnlabel="切换网络"
            />
            <div className="">
              {/* <Records title="发行记录" /> */}
              <Route exact path="/">
                <Records title="发行记录"/>
              </Route>
              <Route exact path="/redeem">
                <Records title="赎回记录"/>
              </Route>
              <Route exact path="/transfer">
                <Records title="转账记录"/>
              </Route>
            </div>
            <ToolTipConfig/>
          </div>

        </div>
      </div>
      <div className={className}>
        <div className="contentWrapper `${className}`">
          <Pdotcard className="left" title="PDOT 转账" component="TransferCard" isBasic/>
          <Records className="right" title="转账记录"/>
        </div>
      </div>
    </div>
  )}

export default React.memo(styled(TransferContent)`
  flex-grow: 1;
  overflow: hidden auto;
  padding: 2.5rem 3rem;
  //  position: relative;
  width: 100%;

  .contentWrapper {
    width: fit-content;
    margin: 0 auto;
  }

  h2 {
    font-size: 32px;
    font-weight: bold;
    color: #444c5e;
    line-height: 48px;
  }
  .cardListWrapper {
    display: inline-flex;
    width: 100%;

    .left {
      margin-right: 20px;

      .cardList {
        display: flex;
        padding: 20px 0;
      }
    }
  }

  // }
  // .main {
  //   display: flex;

  //   .left {
  //     flex: 2;
  //     min-height: 636px;
  //   }
  //   .right {
  //     flex: auto;
  //     margin-left: 20px;
  //     min-height: 636px;
  //   }
  }


`);
