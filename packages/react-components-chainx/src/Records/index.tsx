import React from 'react';
import styled from 'styled-components';
import TransferRecords from './TransferRecords';

const Wrapper = styled.section`
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
      max-height: 324px;
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
`;


interface RecordsProps {
    children?: React.ReactNode;
    className?: string;
    title?: string;
}


export function Records({ children, className = '', title }: RecordsProps): React.ReactElement<RecordsProps> {


  return (
    <Wrapper>
      <p className={`${className} isBasic  `}>{title}</p>
      <div className='pdotCon'>
        <TransferRecords />
      </div>
      {children}
    </Wrapper>
  );
}
