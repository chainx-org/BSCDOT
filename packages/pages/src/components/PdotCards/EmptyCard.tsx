import React  from 'react';
import { Wrapper, Title, Content, Nodata } from './components'
import { useTranslation } from '@polkadot/pages/components/translate';

interface dataProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  noDataMsg?: string;
}

export default function EmptyCard({ noDataMsg, title, className = '' }: dataProps): React.ReactElement<dataProps> {
  const {t} = useTranslation();

  return (
    <Wrapper className={`ui-card ${className}`}>
      <Title className={`ui-card-title`}>{title}</Title>
      <Content className="pdotCon">
        <Nodata className='nodata'>
          <img src='http://lc-XLoqMObG.cn-n1.lcfile.com/40f3f2c50eb57913979a.svg' alt=''/>
          <p>{noDataMsg? noDataMsg: t('Please login to your Polkadot and BSC accounts first')}</p>
        </Nodata>
      </Content>
    </Wrapper>
  );
}
