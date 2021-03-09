import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Empty from '../Empty/index';
import MiniLoading from '../MiniLoading/index';
import Line from './Line';
import { useIsMounted } from '../hooks';
// import useTransfer from '../../../useTransfer';
import { useTranslation } from '@polkadot/react-components/translate';
import { AccountContext } from '@polkadot/react-components-chainx/AccountProvider';
import useTransfer from '@polkadot/app-accounts-chainx/useTransfer';

const Wrapper = styled.div`
  & > div.empty {
    margin-top: 120px;
  }

  .line {
    cursor: pointer;
    position: relative;
    border-bottom: 1px solid #EFEFEF;
    padding: 16px 20px;
    header,
    .account {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0;
    }
    header {
      opacity: 0.32;
      font-size: 12px;
      color: #000000;
      letter-spacing: 0.2px;
      line-height: 16px;
      margin-bottom: 10px;
      .txNum {
        font-size: 11px;
        color: #6F7C7C;
      }
    }

    .account {
      margin-top: 4px;
      opacity: 0.72;
      font-size: 12px;
      font-weight: 500;
      color: #000000;
      letter-spacing: 0.2px;
      line-height: 16px;
    }
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

export default function (): React.ReactElement {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const mounted = useIsMounted();
  const { currentAccount } = useContext(AccountContext);
  const transfers = useTransfer(currentAccount);

  useEffect(() => {
    setLoading(true);
  }, [mounted]);

  useEffect(() => {
    if (mounted.current) {
      setLoading(false);
    }
  });

  const transfersElement = transfers?.map((transfer, index) => {
    return <Line key={index} transfer={transfer} />;
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
      {(transfers || []).length > 0 ? (
        transfersElement
      ) : (
          <div className='empty'>
            <Empty text={t('No transfer record')} />
          </div>
        )}
    </Wrapper>
  );
}
