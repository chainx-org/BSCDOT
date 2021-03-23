
import React, {useRef, useState} from 'react';
import Hash from './Hash';
import { Detail, Label } from './Detail';
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
    <div className='line'
      onClick={() => setOpen(!open)}
      ref={wrapper}>
      <header>
        <span className='txNum'>交易号 <span className='txNums'>{records.seq}</span> </span>
        <span>
          {/* {records.data[1] === currentAccount? <span className='pending'>进行中</span> : <span className='reslove'>已完成</span>} */}
        </span>
      </header>
      <div className='account'>
        <span><Hash hash={records.txFrom} /></span>
        {
          arrows ? <img src={Arrow} alt='Arrow' className='arrow' />: ''
        }
        <span><Hash hash={records.transferTo} /></span>
      </div>
      {isApiReady && open ? (
         <Detail className={`detail  lineDetail${num}`}>
          <div className='hashVal'>
            <Label>交易哈希</Label>
            <Hash hash={records.txHash} />
          </div>
        </Detail>
      ) : null}
    </div>
  );
}
