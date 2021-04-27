import React, { createContext, FC, useEffect, useState } from 'react';

export interface CoinInfoProviderData {
  localCoin: CoinInfo;
  setLocalCoin: React.Dispatch<CoinInfo>;
  coinInfo: CoinInfo;
  setCoinInfo: React.Dispatch<CoinInfo>;
}

export interface CoinInfo {
  coinName: string;
  bCoinName: string;
  whiteIcon: string;
  matchingNode: string;
}

export const CoinInfoContext = createContext<CoinInfoProviderData>({} as CoinInfoProviderData);

export const CoinInfoProvider: FC = ({children}) => {
  const [defaultCoin] = useState<CoinInfo>(JSON.parse(window.localStorage.getItem('coinInfoList') || '{}'));
  const [localCoin, setLocalCoin] = useState<CoinInfo>({
    coinName: defaultCoin.coinName,
    bCoinName: defaultCoin.bCoinName,
    whiteIcon: defaultCoin.whiteIcon,
    matchingNode: defaultCoin.matchingNode,
  })
  const [coinInfo, setCoinInfo] = useState<CoinInfo>({
    coinName: localCoin.coinName,
    bCoinName: localCoin.bCoinName,
    whiteIcon: localCoin.whiteIcon,
    matchingNode: localCoin.matchingNode
  });

  useEffect(() => {
    Object.keys(defaultCoin).length === 0 &&
      setCoinInfo({
        coinName: 'XBTC',
        bCoinName:'BBTC',
        whiteIcon: 'http://lc-XLoqMObG.cn-n1.lcfile.com/e19d81cbc3ad30b636cd.svg',
        matchingNode: 'wss://chainx.supercube.pro/ws'
      })
  }, [])

  useEffect(() => {
    window.localStorage.setItem('coinInfoList', JSON.stringify(coinInfo));
    setLocalCoin(JSON.parse(window.localStorage.getItem('coinInfoList') || '{}'));
  }, [coinInfo]);


  return (
    <CoinInfoContext.Provider value={{
      localCoin,
      setLocalCoin,
      coinInfo,
      setCoinInfo
    }}>
      {children}
    </CoinInfoContext.Provider>
  );
};
