import {useState,useEffect} from 'react';
import {useLazyQuery} from '@apollo/client'


function useQuery(param,cfg){
  var [run,status] = useLazyQuery(param,cfg)

 
  useEffect(() => run(),[])

  return [
    status.loading,
    status.data,
    status.error
  ]
}

export {useQuery}