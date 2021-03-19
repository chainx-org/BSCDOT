// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

// import type { Route } from '@polkadot/apps-routing/types';

import React, { Suspense, useContext, useMemo } from "react";
// import { useLocation } from 'react-router-dom';
import styled from "styled-components";
// import createRoutes from '@polkadot/apps-routing';
// import { ErrorBoundary, Spinner, StatusContext } from '@polkadot/react-components';
// import { useApi } from '@polkadot/react-hooks';

// import { findMissingApis } from '../endpoint';
// import { useTranslation } from '../translate';
import Lpolkadot from "./icons/logo_polkadot.svg";
import Lsamurai from "./icons/logo_samurai.svg";
import Network from "./icons/network.svg";

import PolkadotAcc from "./icons/polkadot_account.svg";
import PlantonAcc from "./icons/planton_account.svg";

import Endpoints from "@polkadot/react-components-chainx/Endpoints";
import Pdotcard from "@polkadot/react-components-chainx/PdotCards/PdotCard";
import Card from "@polkadot/react-components-chainx/Card/Card";
import AccountCard from "@polkadot/react-components-chainx/AccountCard/AccountCard";
import { Records } from "@polkadot/react-components-chainx/Records";

interface Props {
  className?: string;
}

function Contents({ className }: Props): React.ReactElement<Props> {
  //   const { t } = useTranslation();

  return (
    <div className={className}>
      <h2>欢迎来到 Platdot！</h2>
      <div className="cardLiists">
        <div className="left">
          <div className="cardlist">
            <Card isBasic className="pinkCard" label="使用 Polkadot{.js} 插件登录 Polkadot 账户" iconNode={Lpolkadot} />
            {/* <AccountCard
              className='pinkCard'
              accountName='Merrile Burgett'
              accountAdress='12BPUMLYobYiBjPuRCnNd9xZcEAjzXYM5Vjweaa327YwD8FA'
              accountAmount='99999.0000'
              iconNode={PolkadotAcc}
            /> */}
            <AccountCard
              className="grennCard"
              accountName="PlatON 账户"
              accountAdress="atpPUMLYobYiBjPuRCnNd9xZcEAjzXYM5Vjweaa327YwD8FA"
              accountAmount="99999.0000"
              iconNode={PlantonAcc}
            />
            {/* <Card
              isBasic
              className='grennCard'
              label='使用 Samurai 插件登录 PlatON 账户'
              iconNode={Lsamurai}
            /> */}
          </div>
          <div>
            {/* <Pdotcard noData={true} title='发行 PDOT' isBasic noDataMsg='请先登录 Polkadot 和 PlatON 账户' /> */}
            {/* <Pdotcard title="发行 PDOT" isBasic /> */}

            {/* <Route exact path="/" />
            <Route exact path="/redeem" />
            <Route exact path="/transfer" component={Pdotcard} /> */}
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

          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(styled(Contents)`
  flex-grow: 1;
  overflow: hidden auto;
  padding: 2.5rem 3rem;
  //  position: relative;
  width: 100%;
  h2 {
    font-size: 32px;
    font-weight: bold;
    color: #444c5e;
    line-height: 48px;
  }
  .cardLists {
    display: inline-flex;
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
  // }
`);
