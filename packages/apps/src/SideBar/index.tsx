// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';

// import { useTranslation } from '../translate';

import {Link} from 'react-router-dom';
import styled from 'styled-components';

// import { ReactComponent as Logo } from './icons/logo.svg';

import Logo from './icons/logo.svg';
import Publish from './icons/publish.svg'
import Redeem from './icons/redeem.svg'
import Transfer from './icons/transfer.svg'

interface Props {
  className?: string;
}

const Wrapper = styled.div`
  padding-top: 30px;
  width: 256px;
  font-size: 16px;
  background: #fff;
  box-shadow: 6px 0px 20px 0px rgba(0,0,0,0.3);
  // overflow-y: auto;
  // &::-webkit-scrollbar {
  //   display: none;
  // }
  .wrappers {
    margin:0 56px 0 52px;
    .navLists {
      padding-top: 30px;
      .navitem {
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
      .statusrisk {
        
        background: #51ABAD;
        border-radius: 0 10px 10px 0;
        margin: 25px -26px 25px -52px;
        padding-left: 52px;
        a span {
          color: #FFFFFF;
        }
      }
    }
  }
`

function Sidebars ({ className = '' }: Props): React.ReactElement<Props> {
  // const { t } = useTranslation();
  const [recordType, setRecordType] = useState(0);

  const nodeList = ([
    {nodeName: '发行', link: '/',  icon: <img src={Publish} alt='publish' />},
    {nodeName: '赎回', link: '/redeem',   icon: <img src={Redeem} alt='redeem' />},
    {nodeName: '转账', link: '/transfer', icon: <img src={Transfer} alt='transfer' />}
  ]);

  function statusnode(node: any, index: number) {
    setRecordType(index)
    console.log(node,index)

  }

  return (
    <Wrapper
      className=""
    >
      <div className="wrappers">
        <img src={Logo} alt='logo' />
        <ul className="navLists">
          {
            nodeList.map((node: any, index: number) =>
              <li key={index} className={`navitem ${recordType === index ? "statusrisk" : ''}`} onClick={() => statusnode(node,index)}>
                <Link to={node.link}>
                  {node.icon}
                  <span>{node.nodeName}</span>
                </Link>
              </li>
            )
          }
        </ul>
      </div>
    </Wrapper>
  );
}

export default Sidebars
