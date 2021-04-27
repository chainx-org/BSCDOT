import React, { useContext } from 'react';
import styled from 'styled-components';
import { CoinItem } from '@polkadot/pages/components/Header/Endpoints';
import CoinInfo from '@polkadot/pages/components/Header/CoinInfo';
import { Shade } from '@polkadot/pages/components/ToolTipConfig';
import { CoinInfoContext } from '@polkadot/pages/components/CoinInfoProvider';

const Wrapper = styled.section`
  position: fixed;
  left: 50%;
  top: 5%;
  transform: translate(-50%);
  z-index: 999;
  max-height: 500px !important;
  overflow: auto;
  background: rgba(255, 255, 255);
  border: 1px solid #efefef;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  width: 312px;

  .header {
    height: 44px;

    img {
      width: 16px;
      height: 16px;
      margin: 20px 20px 8px;
      cursor: pointer;
    }
  }
`;

interface Props {
  setIsOpen: React.Dispatch<boolean>;
  list: CoinItem[];
}

function CoinInfoList({setIsOpen, list}: Props): React.ReactElement<Props> {
  const {coinInfo} = useContext(CoinInfoContext);

  return (
    <>
      <Shade/>
      <Wrapper>
        <div className="header">
          <img src='http://lc-XLoqMObG.cn-n1.lcfile.com/dd2cf18768579432fc72.png' onClick={() => setIsOpen(false)} alt=""/>
        </div>
        {list.map((item: CoinItem) => (
          <CoinInfo key={item.name} name={item.name} icon={item.CoinIcon} whiteIcon={item.whiteIcon} matchingNode={item.matchingNode}
                    isSelected={coinInfo.coinName=== item.name}
          />
        ))}
      </Wrapper>
    </>
  );
}

export default CoinInfoList;
