// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0



import React, { useCallback } from 'react';
import styled from 'styled-components';
import TransferRecords from '../Records/TransferRecords';
import RedeemRecords from '../Records/RedeemRecords'
import PdotnoData from './Nodata'
import TransferCard from './TransferCard';

interface PdotcardProps {
    children?: React.ReactNode;
    className?: string;
    title?: string;
    isBasic?: boolean;
    noData?: boolean;
    noDataMsg?: string;
}


function Pdotcard({ children, className = '', title, noData, isBasic, noDataMsg }: PdotcardProps): React.ReactElement<PdotcardProps> {


  return (
    <div className={`ui-card ${className}`}>
      <p className={`${className} ${isBasic ? ' isBasic' : ''}  `}>{title}</p>
      <div className='pdotCon'>
        {
          noData ? <PdotnoData noDataMsg={noDataMsg} /> : <TransferCard />
        }
      </div>
    </div>
  );
}

export default React.memo(styled(Pdotcard)`

  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  border: none;
 
  .isBasic {
    font-size: 20px;
    color: #444C5E;
    padding: 15px 20px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 1px solid #EFEFEF;
  }
  .pdotCon {
    // max-height: 324px;
    // min-height: 324px;
    height: 324px;
    overflow-y: auto;
    &::-webkit-scrollbar {    
      width: 5px;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb { 
      background: #6F7C7C;
      border-radius: 2.5px;
    }
  }
`);
