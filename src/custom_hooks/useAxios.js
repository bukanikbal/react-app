import {useState} from 'react'
import {EventEmitter} from 'events'
import axios from 'axios'

function useAxios(){
  var [loading,setLoading] = useState(
    false
  ) 

  var [handler] = useState(
    new EventEmitter()
  )

  async function request(val){
  	try{
  	  var result = await axios(
        val
  	  )
  	  handler.emit(
  	  	'result',
  	  	result.data
  	  )
  	  handler.emit(
        'afterFetch',
  	  )
  	}
  	catch(error){
  	  handler.emit(
        'error',
        error
  	  )
  	}
  	finally{
  	  setLoading(() => {
  	  	return false
  	  })
  	}
  }

  function preRequest(val){
    setLoading(() => {
      return true
    })

    request(val)
  }

  handler.on('request',preRequest)

  return [loading,handler]
}

export {useAxios}