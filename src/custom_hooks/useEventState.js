import {useState} from 'react'
import {EventEmitter} from 'events'

function useEventState(val){
  var [state,setState] = useState(val)
  var [handler,setHandler] = useState(
    new EventEmitter()
  )

  handler.on('set',(val) => {
  	setState((currentState) => {
  	  return val
  	})

  	handler.emit(
  	  'chg'
  	)
  })

  return [state,handler]
}

export {useEventState}