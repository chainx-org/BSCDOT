import React, { useCallback } from 'react';
import styled from 'styled-components';
import NoData from './icons/nodata.svg'
import Logout from './icons/logout.svg'

interface dataProps {
    children?: React.ReactNode;
    className?: string;
    isBasic?: boolean;
    noDataMsg?: boolean;
}


function PdotnoData({ children, className = '', noDataMsg, isBasic }: dataProps): React.ReactElement<dataProps> {

    return (
      <div className={`nodata ${className}`}>
        <img src={Logout}/>
        <p>{noDataMsg}</p>
      </div>
    );
}


export default React.memo(styled(PdotnoData)`
  min-height: 324px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  // vertical-align: middle;
  border-radius: 10px;
  border: none;
  &.nodata {
    font-size: 12px;
    color: #AFB1B4;
    letter-spacing: 0;
    text-align: center;
  }
  
`);
