import {useState,useEffect} from 'react'

function useWebSocket(param){
  var [webSocket,setWebSocket] = useState(new WebSocket(param))
  var [reconnectInterval,setReconnectInterval] = useState(Date.now())

  var reconnectFunc = () => setWebSocket(new WebSocket(param))

  webSocket.onclose = () => setReconnectInterval(setInterval(
    reconnectFunc,10000
  ))

  webSocket.onopen = () => {
  	clearInterval(reconnectInterval)
  	setReconnectInterval(Date.now())
  }


  return [webSocket]
}

export {useWebSocket}