import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { useTranslation } from '@polkadot/pages/components/translate';
import { NetWorkContext } from '@polkadot/pages/components/NetWorkProvider';
import CoinInfoList from '@polkadot/pages/components/Header/CoinInfoList';
import { CoinInfoContext } from '@polkadot/pages/components/CoinInfoProvider';

interface EndpointProps {
  className?: string;
}

export interface CoinItem {
  name: string;
  matchingNode: string;
  CoinIcon: string;
  whiteIcon: string;
}

function Endpoints({className = ''}: EndpointProps): React.ReactElement<EndpointProps> {
  const [isEndpoints, setIsEndpoints] = useState<boolean>(false);
  const {t} = useTranslation();
  const {coinInfo} = useContext(CoinInfoContext)

  const _toggleEndpoints = (): void => setIsEndpoints(true);

  const coinList: CoinItem[] = [
    {
      name: `DOT`,
      matchingNode: 'wss://polkadot.elara.patract.io',
      CoinIcon: 'http://lc-XLoqMObG.cn-n1.lcfile.com/0a9cba405d7acad81643.svg',
      whiteIcon: 'http://lc-XLoqMObG.cn-n1.lcfile.com/519b3e5ce282616f1cd7.svg'
    },
    {
      name: `PCX`,
      matchingNode: 'wss://chainx.supercube.pro/ws',
      CoinIcon: 'http://lc-XLoqMObG.cn-n1.lcfile.com/786ca6353bc2f938d7b8.svg',
      whiteIcon: 'http://lc-XLoqMObG.cn-n1.lcfile.com/9005a4ad230740127fc2.svg'
    },
    {
      name: `XBTC`,
      matchingNode: 'wss://chainx.supercube.pro/ws',
      CoinIcon: 'http://lc-XLoqMObG.cn-n1.lcfile.com/23004d06cafd179780c1.svg',
      whiteIcon: 'http://lc-XLoqMObG.cn-n1.lcfile.com/e19d81cbc3ad30b636cd.svg'
    },
  ]

  return (
    <div className={`isBasic ${className}`}>
      <div className='coinInfo'>
        <div className="leftIcon">
          <img src={coinInfo.whiteIcon} alt={coinInfo.coinName}/>
        </div>
        <div className="rightCon">
          <div className="title">{t('The current currency')}</div>
          <p className="tabEndpoints">{coinInfo.coinName}</p>
        </div>
      </div>

      <Button className="ui-tabEndpoint" isBasic label={t('Switch currency')} onClick={_toggleEndpoints}/>
      {isEndpoints && (
        <CoinInfoList setIsOpen={setIsEndpoints} list={coinList}/>
      )}
    </div>
  );
}

export default React.memo(styled(Endpoints)`
  min-width: 308px;
  height: 152px;
  color: #ffffff;
  background: transparent;
  border-radius: 10px;
  border: none;
  padding: 20px 0 0 22px;
  margin: 0 0 0 20px;

  &.isBasic {
    display: flex;
    flex-direction: column;
    .coinInfo{
      display: flex;
      .rightCon {
        display: flex;
        flex-direction: column;
        margin-left: 22px;
        .title {
          font-size: 16px;
          margin-bottom: 6px;
        }
        .tabEndpoints {
          font-size: 20px;
          margin-bottom: 20px;
        }
      }
    }
  }

  .ui-tabEndpoint {
    padding: 8px 16px;
    min-height: 36px;
    border: 1px solid #ffffff;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    margin: 0 auto;
    transform: translateX(-22%);
  }

  &.orangeCard {
    background-image: linear-gradient(-45deg, #FFC947 0%, #F99A14 100%);
  }
`);
