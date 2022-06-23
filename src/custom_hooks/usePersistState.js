import {useState,useEffect} from 'react'
import {reactive} from '../graphql/reactive'

function usePersistState({localStore}){
  var [done,setDone] = useState(false)

  function persistState(){
    if(localStore){
      reactive({
        ...JSON.parse(
          localStore
        )
      })
      setDone(
        true
      )
    }
    else{
      setDone(
        true
      )
    }
  }

  useEffect(() => persistState(),[])

  return done
}

export {usePersistState}