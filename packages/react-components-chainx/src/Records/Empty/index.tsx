import React from 'react';
import NoData from './nodata.svg'
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 324px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  border: none;
  &.nodata {
    font-size: 12px;
    color: #AFB1B4;
    letter-spacing: 0;
    text-align: center;
  }
`;

type Props = {
  className?: string,
  style?: React.CSSProperties,
  text: string
}

export default function ({ className = '', style, text }: Props): React.ReactElement<Props> {
  return (
    <Wrapper className={`nodata ${className}`} style={style}>
      <img src={NoData} alt='empty'/>
      <p>{text}</p>
    </Wrapper>
  );
}
