import React, { useContext, useRef, useState } from 'react';
import Hash from './Hash';
import { Account, Detail, Header, Label, Line, Sequence } from './Detail';
import { useOutsideClick } from '../hooks';
import { useApi } from '@polkadot/react-hooks';
import Arrow from './arrow.svg';
import moment from 'moment';
import { PlatonAccountsContext } from '../../PlatonAccountsProvider';
import { PolkadotAccountsContext } from '../../PolkadotAccountsProvider';

export default function ({records, num, arrows, isReverse}: any) {
  const {isApiReady} = useApi();
  const [open, setOpen] = useState(false);
  const { platonAccount } = useContext(PlatonAccountsContext)
  const { currentAccount } = useContext(PolkadotAccountsContext)

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
            <Hash hash={platonAccount} className='address'/>
            {arrows ? <img src={Arrow} alt='Arrow' className='arrow'/> : ''}
            <Hash hash={currentAccount} className='address'/>
          </>:
          <>
            <Hash hash={currentAccount} className='address'/>
            {arrows ? <img src={Arrow} alt='Arrow' className='arrow'/> : ''}
            <Hash hash={platonAccount} className='address'/>
          </>
        }
      </Account>
      {isApiReady && open ? (
        <Detail className={`detail  lineDetail${num}`}>
          <div className='hashVal'>
            <Label>交易哈希</Label>
            <Hash hash={records.txHash} className='hash'/>
          </div>
        </Detail>
      ) : null}
    </Line>
  );
}
