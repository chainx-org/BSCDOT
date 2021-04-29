import { useEffect, useState } from 'react';
import { erc20_minter_contract } from '@polkadot/pages/contract';

interface TransferResultItem {
  returnValues: TransferItem;
  transactionHash: string;
}

export interface TransferItem {
  from: string;
  to: string;
  value: string;
  transactionHash: string;
}

interface AllRecords {
  PublishRecords: TransferItem[],
  RedeemRecords: TransferItem[],
  Transfers: TransferItem[],
  // transferCompletion: boolean;
}

const mapNewRecords = (RecordsList: TransferResultItem[]): TransferItem[] => {
  return RecordsList.map((item: TransferResultItem) => ({
    from: item.returnValues.from,
    to: item.returnValues.to,
    value: item.returnValues.value,
    transactionHash: item.transactionHash
  }));
};

export default function useTokenTransferList(BSCAccount: string) {
  const [state, setState] = useState<AllRecords>({PublishRecords: [], RedeemRecords: [], Transfers: []});

  const fetchTransfers = (account: string): void => {
    erc20_minter_contract.getPastEvents('Transfer', {
      fromBlock: 0,
    }, (error: Error, events: TransferResultItem[]) => {
      console.log(events)
      const PublishRecords: TransferItem[] = mapNewRecords(events.filter((element) => element.returnValues.from === '0x0000000000000000000000000000000000000000' && element.returnValues.to.toLowerCase() === account.toLowerCase()));
      const RedeemRecords: TransferItem[] = mapNewRecords(events.filter((element) => element.returnValues.from.toLowerCase() === account.toLowerCase() && element.returnValues.to === '0x0000000000000000000000000000000000000000'));
      const Transfers: TransferItem[] = mapNewRecords(events.filter((element) => element.returnValues.from.toLowerCase() === account.toLowerCase() && element.returnValues.to !== '0x0000000000000000000000000000000000000000'));
      setState({
        PublishRecords,
        RedeemRecords,
        Transfers,
        // transferCompletion
      });
    });
  };

  useEffect((): void => {
    fetchTransfers(BSCAccount)
  }, [BSCAccount]);

  return {state, fetchTransfers};
}
