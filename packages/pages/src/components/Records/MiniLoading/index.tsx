import React from 'react';
import styled from 'styled-components';
import Loading from './loading.svg';

const Wrapper = styled.i`
  display: inline-flex;
  align-items: center;
  @keyframes circle {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  img {
    animation: circle 2s linear infinite;
    width: 32px;
  }
`;

type Props = {
  className?: string
}

export default function ({ className = '' }: Props): React.ReactElement<Props> {
  return (
    <Wrapper className={className}>
      <img alt='loading' src='http://lc-XLoqMObG.cn-n1.lcfile.com/68a85e472802b872d7c4.svg' />
    </Wrapper>
  );
}
