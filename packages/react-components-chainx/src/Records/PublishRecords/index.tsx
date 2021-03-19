import React, { useEffect, useState } from 'react';
import Empty from '../Empty/index';
import MiniLoading from '../MiniLoading/index';
import Line from './Line';
import { useIsMounted } from '../hooks';
import { useTranslation } from '@polkadot/react-components/translate';
import { LoadingWrapper, Wrapper } from '../components/Detail';


interface RecordsProps {
  children?: React.ReactNode;
  className?: string;
  recordlen?: number;
  record?: any;
}

export function PublishRedeem({ children, className = '', record, recordlen }: RecordsProps): React.ReactElement<RecordsProps> {

  // const { t } = useTranslation();
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

  const publishElement = record?.map((publish: any, index: number) => {
    return <Line key={index} transfer={publish} num={index} />;
  });

  if (loading) {
    return (
      <LoadingWrapper>
        <MiniLoading />
      </LoadingWrapper>
    );
  }

  return (
    <Wrapper className={ recordlen === 1 ?  'normal' : 'overflow' }>
      {(record || []).length > 0 ? ( publishElement ) : (<Empty text='暂无数据' />)}
    </Wrapper>
  );
}
