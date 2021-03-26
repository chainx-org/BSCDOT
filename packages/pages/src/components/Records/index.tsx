import React, { useEffect, useState } from 'react';
import { useIsMounted } from './hooks';
import { LoadingWrapper, RecordDetail, Title, Wrapper } from './components/Detail';
import MiniLoading from './MiniLoading';
import Line from './components/Line';
import Lines from './components/Lines';
import Empty from './Empty';

interface RecordsProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  recordLength?: number;
  records?: any;
  arrows?: boolean;
}

export default function Records({ children, className = '', title, records, recordLength, arrows }: RecordsProps): React.ReactElement<RecordsProps> {
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
    <Wrapper className={`ui-record ${className} `}>
      <Title className='ui-record-title'>{title}</Title>
      <RecordDetail className={ recordLength === 1 ?  'normal' : 'overflow' }>
        {(records || []).length > 0 ? ( RecordsElement ) : (<Empty text='暂无数据' />)}
      </RecordDetail>
    </Wrapper>
  );
}
