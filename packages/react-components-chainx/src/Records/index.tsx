import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useIsMounted } from '@polkadot/app-accounts-chainx/Myview/Records/hooks';
import { LoadingWrapper, RecordDetail } from './components/Detail';
import MiniLoading from '@polkadot/app-accounts-chainx/Myview/Records/MiniLoading';
import Line from './components/Line';
import Lines from './components/Lines';
import Empty from './Empty';

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
`;

interface RecordsProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  recordlen?: number;
  records?: any;
  arrows?: boolean;
}

export function Records({ children, className = '', title, records, recordlen, arrows }: RecordsProps): React.ReactElement<RecordsProps> {
  const [loading, setLoading] = useState(true);
  const mounted = useIsMounted();

  useEffect(() => {
    setLoading(true);
  }, [mounted]);

  useEffect(() => {
    if (mounted.current) {
      setLoading(false);
    }
  });

  const RecordsElement = arrows ? records?.map((record: any, index: number) => {
    return <Line key={index} records={record} num={index} arrows={arrows} />;
  }) : records?.map((record: any, index: number) => {
    return <Lines key={index} records={record} num={index} arrows={arrows} />;
  });

  if (loading) {
    return (
      <LoadingWrapper>
        <MiniLoading />
      </LoadingWrapper>
    );
  }

  return (
    <Wrapper>
      <p className={`${className} isBasic  `}>{title}</p>
      <div className='pdotCon'>
        <RecordDetail className={ recordlen === 1 ?  'normal' : 'overflow' }>
          {(records || []).length > 0 ? ( RecordsElement ) : (<Empty text='暂无数据' />)}
        </RecordDetail>
      </div>
    </Wrapper>
  );
}
