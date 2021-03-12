// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React  from 'react';

// import { useTranslation } from '../translate';

import styled from 'styled-components';


import Logo from './icons/logo.svg';
import Publish from './icons/publish.svg'
import Redeem from './icons/redeem.svg'
import Transfer from './icons/transfer.svg'
import SideItem from './SideItem';

interface Props {
  className?: string;
}

export interface NodeItem{
  nodeName: string;
  link: string;
  icon: React.ReactElement;
}

const Wrapper = styled.div`
  padding-top: 30px;
  width: 256px;
  font-size: 16px;
  background: #fff;
  box-shadow: 6px 0 20px 0 rgba(0,0,0,0.3);
  // overflow-y: auto;
  // &::-webkit-scrollbar {
  //   display: none;
  // }
  .wrappers {
    margin:0 56px 0 52px;
    .navLists {
      padding-top: 30px;
      .navItem {
        margin: 25px 0;
        a {
          display: flex;
          align-items: center;
          padding: 15px 0;
          span {
            padding-left: 16px;
            color: #6F7C7C;
          }
        }

      }
      .statusRisk > a.selected {
        background: #51ABAD;
        border-radius: 0 10px 10px 0;
        margin: 25px -26px 25px -52px;
        padding-left: 52px;

        span{
          color: #FFFFFF;
        }
      }
    }
  }
`

function Sidebars ({ className = '' }: Props): React.ReactElement<Props> {
  // const { t } = useTranslation();

  const nodeList: NodeItem[] = ([
    {nodeName: '发行', link: '/',  icon: <img src={Publish} alt='publish' />},
    {nodeName: '赎回', link: '/redeem',   icon: <img src={Redeem} alt='redeem' />},
    {nodeName: '转账', link: '/transfer', icon: <img src={Transfer} alt='transfer' />}
  ]);



  return (
    <Wrapper
      className=""
    >
      <div className="wrappers">
        <img src={Logo} alt='logo' />
        <ul className="navLists">
          {
            nodeList.map((node: NodeItem, index: number) =>
              <SideItem node={node} key={index} id={index}/>
            )
          }
        </ul>
      </div>
    </Wrapper>
  );
}

export default Sidebars
