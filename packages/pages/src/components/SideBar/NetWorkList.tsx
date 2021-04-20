import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@polkadot/pages/components';
import NetOption from '@polkadot/pages/components/SideBar/NetOption';
import { NetWorkInfo } from '@polkadot/pages/components/Header/Endpoints';
import { useTranslation } from '@polkadot/pages/components/translate';
import { NetWorkContext } from '@polkadot/pages/components/NetWorkProvider';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 20px;
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  color: #3F3F3F;
  font-weight: 600;
  white-space: nowrap;
  padding-top: 24px;
  cursor: pointer;
  position: relative;
  width: fit-content;
  margin: 0 auto;
  > span{
    margin-right: 4px;
  }
`

function NetWorkList(): React.ReactElement{
  const {t} = useTranslation();
  const [isShow, setIsShow] = useState<boolean>(false)
  const {netName} = useContext(NetWorkContext);
  const netList: NetWorkInfo[] = [
    {
      title: `Alaya ${t('network')}`,
      iconUrl: 'http://lc-XLoqMObG.cn-n1.lcfile.com/bf834bf003fe7c3d2a68.svg',
      polkadotNetUrl: "wss://supercube.pro/ws",
      platOnNetUrl: "http://47.110.34.31:6789"
    },
    {
      title: `PlatON ${t('network')}`,
      iconUrl: 'http://lc-XLoqMObG.cn-n1.lcfile.com/a984a2950cd8099f093e.svg',
      polkadotNetUrl: "wss://rpc.polkadot.io",
      platOnNetUrl: ""
    }
  ];

  return (
    <Wrapper onClick={() => setIsShow(!isShow)}>
      <span>{`${netName} ${t('network')}`}</span>
      <Icon icon={`${isShow? 'caret-up': 'caret-down'}`}/>
      {isShow && <NetOption netList={netList}/>}
    </Wrapper>
  )
}

export default NetWorkList
