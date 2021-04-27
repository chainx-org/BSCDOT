import React, { createContext, FC, useEffect, useState } from 'react';

export interface CoinInfoProviderData {
  localCoin: CoinInfo;
  setLocalCoin: React.Dispatch<CoinInfo>;
  coinInfo: CoinInfo;
  setCoinInfo: React.Dispatch<CoinInfo>;
}

export interface CoinInfo {
  coinName: string;
  whiteIcon: string;
  matchingNode: string;
}

export const CoinInfoContext = createContext<CoinInfoProviderData>({} as CoinInfoProviderData);

export const CoinInfoProvider: FC = ({children}) => {
  const defaultCoin: CoinInfo = JSON.parse(window.localStorage.getItem('coinInfoList') || '{}');
  const [localCoin, setLocalCoin] = useState<CoinInfo>({
    coinName: defaultCoin.coinName,
    whiteIcon: defaultCoin.whiteIcon,
    matchingNode: defaultCoin.matchingNode,
  })
  const [coin, setCoin] = useState<CoinInfo>({
    coinName: localCoin.coinName,
    whiteIcon: localCoin.whiteIcon,
    matchingNode: localCoin.matchingNode
  });

  useEffect(() => {
    window.localStorage.setItem('coinInfoList', JSON.stringify(coin));
    setLocalCoin(JSON.parse(window.localStorage.getItem('coinInfoList') || '{}'));
  }, [coin]);


  return (
    <CoinInfoContext.Provider value={{
      localCoin,
      setLocalCoin,
      coinInfo: coin,
      setCoinInfo: setCoin
    }}>
      {children}
    </CoinInfoContext.Provider>
  );
};
