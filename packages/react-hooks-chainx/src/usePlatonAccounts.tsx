import {useEffect, useState} from 'react';

interface PlatonAccountsList{
  platonAccounts: string[],
  platonSelectedAccount: string,
  hasPlatonAccount: boolean
}

function usePlatonAccounts(): PlatonAccountsList{
  const [state, setState] = useState({
    platonAccounts: [],
    platonSelectedAccount: '',
    hasPlatonAccount: false
  })

  useEffect(() => {
    alaya.request({ method: "platon_requestAccounts" })
      .then((platonAccounts: string[]) => setState({
        platonAccounts,
        platonSelectedAccount: alaya.selectedAddress,
        hasPlatonAccount: platonAccounts.length !== 0
      }))

  },[])

  return state;
}

export default usePlatonAccounts
