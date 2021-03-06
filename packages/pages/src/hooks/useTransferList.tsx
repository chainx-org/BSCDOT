import { useEffect, useState } from 'react';
import { erc20_minter_contract } from '@polkadot/pages/contract';
import { interval } from 'rxjs';

interface TransferResultItem {
  returnValues: TransferItem;
  transactionHash: string;
  blockNumber: number;
}

export interface TransferItem {
  from: string;
  to: string;
  value: string;
  transactionHash: string;
  blockNumber: number;
}

interface AllRecords {
  PublishRecords: TransferItem[],
  RedeemRecords: TransferItem[],
  Transfers: TransferItem[],
}

const mapNewRecords = (RecordsList: TransferResultItem[]): TransferItem[] => {
  return RecordsList.map((item: TransferResultItem) => ({
    from: item.returnValues.from,
    to: item.returnValues.to,
    value: item.returnValues.value,
    transactionHash: item.transactionHash,
    blockNumber: item.blockNumber
  })).reverse();
};

export default function useTokenTransferList(BSCAccount: string) {
  const [state, setState] = useState<AllRecords>({PublishRecords: [], RedeemRecords: [], Transfers: []});

  const fetchTransfers = (account: string) => {
    erc20_minter_contract.getPastEvents('Transfer', {fromBlock: 0},
      (error: Error, events: TransferResultItem[]) => {
        const PublishRecords: TransferItem[] = mapNewRecords(
          events.filter((element) =>
            element.returnValues.from === '0x0000000000000000000000000000000000000000' &&
            element.returnValues.to.toLowerCase() === account.toLowerCase()
          )
        );
        const RedeemRecords: TransferItem[] = mapNewRecords(
          events.filter((element) =>
            element.returnValues.from.toLowerCase() === account.toLowerCase() &&
            element.returnValues.to === '0x0000000000000000000000000000000000000000'
          )
        );
        const Transfers: TransferItem[] = mapNewRecords(
          events.filter((element) => (
              (element.returnValues.from.toLowerCase() === account.toLowerCase() &&
                element.returnValues.to !== '0x0000000000000000000000000000000000000000') ||
              (element.returnValues.to.toLowerCase() === account.toLowerCase() &&
                element.returnValues.from !== '0x0000000000000000000000000000000000000000')
            )
          )
        );
        setState({
          PublishRecords,
          RedeemRecords,
          Transfers,
          // transferCompletion
        });
      });
  };
  useEffect((): () => void => {
    const fetchTransfers$ = interval(1000).subscribe(() => fetchTransfers(BSCAccount));

    return () => fetchTransfers$.unsubscribe();
  }, [BSCAccount]);

  return {state, fetchTransfers};
}
