import React, {useContext} from 'react';
import styled from 'styled-components';
import Network from './icons/network.svg';
import Endpoints from '@polkadot/pages/components/Endpoints';
import PolkadotAccount from '@polkadot/pages/components/Header/PolkadotAccount';
import PlatonAccount from '@polkadot/pages/components/Header/PlatonAccount';
import {NetWorkContext} from '@polkadot/react-components-chainx/NetWorkProvider';

interface Props {
  className?: string;
}


function Header({className}: Props): React.ReactElement<Props> {
  const {netWork} = useContext(NetWorkContext)
  return (
    <div className={className}>
      <h2>欢迎来到 Platdot！</h2>
      <div className="cardListWrapper">
        <PolkadotAccount/>
        <PlatonAccount/>
        <Endpoints className="blueCard" iconNode={Network} title="当前网络" content={netWork.name} btnLabel="切换网络"/>
      </div>
    </div>
  );
}

export default React.memo(styled(Header)`
  flex-grow: 1;
  overflow: hidden auto;
  padding: 2.5rem 0rem 1rem 0rem;
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
    padding: 20px 0;
  }
`);
