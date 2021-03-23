import {useEffect, useState} from 'react';
import axios from 'axios';

export interface Transfer {
  id: number,
  seq: number,
  txHash: string,
  blockNumber: number,
  txFrom: string,
  contract: number,
  transferTo: string,
  transferValue: number,
  symbol: string,
  type: string,
  blockTimestamp: number,
  decimal: number,
  fromType: number,
  toType: number,
  systemTimestamp: number,
  value: string
}

export interface PublishRecord  extends Transfer{}
export interface RedreemRecord  extends Transfer{}

interface AllRecords {
  PublishRecords: PublishRecord[],
  RedeemRecords: RedreemRecord[],
  Transfers: Transfer[],
}

export default function useTokenTransferList(currentAccount = ''): AllRecords {
  const [state, setState] = useState<AllRecords>({PublishRecords: [], RedeemRecords: [], Transfers: []});
  // let transferTimeId: any = '';

  async function fetchTransfers(currentAccount: string) {
    // let res: any;
    const res = await axios.post('http://39.106.4.1:53311/alaya-api/token/tokenTransferList',{address:`${currentAccount}`});
    const records = res.data.data
    setState({
      PublishRecords: records.filter((publish: PublishRecord) => publish.txFrom === 'atp1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqdruy9j'),
      RedeemRecords: records.filter((redreem: RedreemRecord) => redreem.transferTo === 'atp1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqdruy9j'),
      Transfers: records.filter((transfer: Transfer) => transfer.txFrom !== 'atp1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqdruy9j' && transfer.transferTo !== 'atp1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqdruy9j')
    });
  }

  useEffect((): void => {
    fetchTransfers('atp18hqda4eajphkfarxaa2rutc5dwdwx9z5vy2nmh');
  }, []);

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

  return state
}
