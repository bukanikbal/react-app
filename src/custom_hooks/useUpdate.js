import {useEffect} from 'react'
import {useMutation} from '@apollo/client'

function useUpdate(param,cfg){
  var [run,status] = useMutation(param,cfg)

  return [
    run,
    status.loading,
    status.error,
    status.data
  ]
}



export {useUpdate}