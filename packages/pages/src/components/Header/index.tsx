import React from "react";
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

import polkadot from "./icons/logo_polkadot.svg";
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

function Header({ className }: Props): React.ReactElement<Props> {
  //   const { t } = useTranslation();

  return (
    <div className={className}>
      <h2>欢迎来到 Platdot！</h2>
      <div className="cardListWrapper">
        <Card isBasic className="pinkCard" label="使用 Polkadot{.js} 插件登录 Polkadot 账户" iconNode={polkadot} />
        <AccountCard
          className="grennCard"
          accountName="PlatON 账户"
          accountAdress="atpPUMLYobYiBjPuRCnNd9xZcEAjzXYM5Vjweaa327YwD8FA"
          accountAmount="99999.0000"
          iconNode={PlantonAcc}
        />
        <Endpoints className="blueCard" iconNode={Network} title="当前网络" content="PlatON 网络" btnlabel="切换网络" />
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
