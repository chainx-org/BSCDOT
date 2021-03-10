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

  .line {
    cursor: pointer;
    position: relative;
    border-bottom: 1px solid #EFEFEF;
    padding: 15px 20px;
    
    header,
    .account {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    header {
      margin-bottom: 10px;
      .txNum {
        font-size: 11px;
        color: #6F7C7C;
      }
      .pending, .reslove {
        font-size: 14px;
        text-align: right;
      }
      .pending {
        color: #51ABAD;
      }
      .reslove {
        color: #444C5E;
      }
    }

    .account {
      .arrow {
        width: 15px;
        height: 10px;
      }
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
            <Empty text='暂无数据' />
          </div>
        )}
    </Wrapper>
  );
}
