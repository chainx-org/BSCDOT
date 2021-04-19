import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Title } from '@polkadot/pages/components/PdotCards/components';

interface CardProps{
  children: ReactNode;
  title?: string;
  className?: string;
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  border: none;
`

function Card({children, title, className= ''}: CardProps): React.ReactElement<CardProps>{
  return (
    <CardWrapper className={`ui-card ${className}  `}>
      {title&&  <Title className={`ui-card-title `}>{title}</Title>}
      {children}
    </CardWrapper>
  )
}

export default Card
