import {useEffect, useState} from 'react';
import axios from 'axios';
import {useApi} from '@polkadot/react-hooks';

interface Transfer {
  id: number,
  sendName: string,
  receiveName: string,
  hashAdd: string,
  price: number,
  createdAt: number
}

export default function useTransferList(currentAccount = ''): Transfer[] {
  const [state, setState] = useState<Transfer[]>([]);
  let transferTimeId: any = '';

  async function fetchTransfers(currentAccount: string) {
    let res: any;
    // res = await axios.get(`https://api-v2.chainx.org/accounts/${currentAccount}/transfers?page=0&page_size=20`);
    res = await axios.post('https://scan.alaya.network/browser-server/token/tokenTransferList',{address:`${currentAccount}`})
    .then(res=>{ console.log(res) })
    .catch(err=>{ console.log(err) })
    setState(res);
  }
  fetchTransfers('atp18hqda4eajphkfarxaa2rutc5dwdwx9z5vy2nmh')
  // useEffect((): void => {
  //   fetchTransfers(currentAccount);
  // }, []);

  // useEffect(() => {
  //   if(transferTimeId){
  //     window.clearInterval(transferTimeId);
  //   }
  //   fetchTransfers(currentAccount);
  //   transferTimeId = setInterval(() => {
  //     fetchTransfers(currentAccount);
  //     window.clearInterval(transferTimeId)
  //   }, 5000);

  //   return () => window.clearInterval(transferTimeId);
  // }, [currentAccount]);

  return state;
}
