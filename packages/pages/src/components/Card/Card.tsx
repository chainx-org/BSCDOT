import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface CardProps{
  children: ReactNode;
  className?: string;
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  border: none;
`

function Card({children, className= ''}: CardProps): React.ReactElement<CardProps>{
  return (
    <CardWrapper className={`ui-card ${className}  `}>
      {children}
    </CardWrapper>
  )
}

export default Card
