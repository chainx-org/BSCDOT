
import React, {useRef, useState} from 'react';
import Hash from './Hash';
import { Account, Detail, Header, Label, Line, Sequence } from './Detail';
// import { useTranslation } from '@polkadot/react-components/translate';
import useOutsideClick from '@polkadot/app-accounts-chainx/Myview/useOutsideClick';
import {useApi} from '@polkadot/react-hooks';
import Arrow from '../components/arrow.svg'

export default function ({ records, num, arrows }: any) {
  // const { t } = useTranslation();
  const {isApiReady} = useApi()
  const [open, setOpen] = useState(false);
  
  const wrapper = useRef(null);

  useOutsideClick(wrapper, () => {
    setOpen(false);
  });

  return (
    <Line className='publishandredeem'
      onClick={() => setOpen(!open)}
      ref={wrapper}>
      <Header>
        <Sequence>交易号 <span className='txNums'>{records.seq}</span> </Sequence>
      </Header>
      <Account>
        <Hash hash={records.txFrom} className='address' />
        {
          arrows ? <img src={Arrow} alt='Arrow' className='arrow' />: ''
        }
        <Hash hash={records.transferTo} className='address' />
      </Account>
      {isApiReady && open ? (
         <Detail className={`detail  lineDetail${num}`}>
          <div className='hashVal'>
            <Label>交易哈希</Label>
            <Hash hash={records.txHash} className='hash' />
          </div>
        </Detail>
      ) : null}
    </Line>
  );
}
