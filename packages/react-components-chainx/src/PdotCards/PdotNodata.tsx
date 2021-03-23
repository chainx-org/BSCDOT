import React  from 'react';
import { Wrapper, Title, Content, Nodata } from './components/index'
import Logout from './icons/logout.svg'

interface dataProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  noDataMsg?: string;
}

export default function PdotNodata({ children, className = '', noDataMsg, title }: dataProps): React.ReactElement<dataProps> {

  return (
    <Wrapper className={`ui-card ${className}`}>
      <Title className={`ui-card-title  `}>{title}</Title>
      <Content className="pdotCon">
        <Nodata className='nodata'>
          <img src={Logout}/>
          <p>{noDataMsg}</p>
        </Nodata>
      </Content>
    </Wrapper>
  );
}
