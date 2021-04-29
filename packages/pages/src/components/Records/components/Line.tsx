import React, { useContext, useRef, useState } from 'react';
import Hash from './Hash';
import { Account, Detail, Header, Label, Line, Sequence } from './Detail';
import { useOutsideClick } from '../hooks';
import { useApi } from '@polkadot/react-hooks';
import moment from 'moment';
import { BSCAccountsContext } from '../../BSCAccountsProvider';
import { PolkadotAccountsContext } from '../../PolkadotAccountsProvider';
import { shortenHash } from '@polkadot/pages/helper/helper';
import { useTranslation } from '@polkadot/pages/components/translate';

export default function ({records, num, arrows, isReverse}: any) {
  const {isApiReady} = useApi();
  const [open, setOpen] = useState(false);
  const { BSCAccount } = useContext(BSCAccountsContext)
  const { currentAccount } = useContext(PolkadotAccountsContext)
  const {t} = useTranslation();

  const wrapper = useRef(null);

  useOutsideClick(wrapper, () => {
    setOpen(false);
  });

  return (
    <Line className='publishandredeem' onClick={() => setOpen(!open)} ref={wrapper}>
      <Header>
        <Sequence className='txNum'>{moment(new Date(records.blockTimestamp)).format('YYYY/MM/DD hh:mm:ss')}</Sequence>
      </Header>
      <Account>
        {
          isReverse ?
          <>
            <Hash hash={BSCAccount} className='address'/>
            {arrows ? <img src='http://lc-XLoqMObG.cn-n1.lcfile.com/cb023eeb56945d0cd674.svg' alt='Arrow' className='arrow'/> : ''}
            <div className='address'>{shortenHash(currentAccount)}</div>
          </>:
          <>
            <div className='address'>{shortenHash(currentAccount)}</div>
            {arrows ? <img src='http://lc-XLoqMObG.cn-n1.lcfile.com/cb023eeb56945d0cd674.svg' alt='Arrow' className='arrow'/> : ''}
            <Hash hash={BSCAccount} className='address'/>
          </>
        }
      </Account>
      {isApiReady && open ? (
        <Detail className={`detail  lineDetail${num}`}>
          <div className='hashVal'>
            <Label>{t('Transaction hash')}</Label>
            <Hash hash={records.transactionHash} className='hash'/>
          </div>
        </Detail>
      ) : null}
    </Line>
  );
}
