import {useEffect, useState} from 'react';

interface BSCAccountsList{
  BSCSelectedAccount: string,
  hasBSCAccount: boolean
}

function useBSCAccounts(): BSCAccountsList{
  const [state, setState] = useState<BSCAccountsList>({
    BSCSelectedAccount: '',
    hasBSCAccount: false
  })

  useEffect(() => {
    if(typeof window.ethereum !== 'undefined'){
      ethereum.request({ method: "eth_accounts" })
        .then((Accounts: string[]) => setState({
          BSCSelectedAccount: Accounts[0],
          hasBSCAccount: Accounts.length !== 0
        }))
    }

  },[])

  return state;
}
export default useBSCAccounts
