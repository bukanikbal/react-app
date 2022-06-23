import {useEffect} from 'react'

function useLocalStorage(param){
  function onChange(){
    var store = JSON.stringify(param)
    localStorage.localStore = store
  }

  useEffect(() => onChange(),[param])
  
  return 0
}

export {useLocalStorage}

