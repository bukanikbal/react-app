import {useState,useEffect} from 'react'
import {io} from 'socket.io-client'

function useSocketIo(sA,ids){
  var [autoConnect] = useState(false)

  var [cfg] = useState({autoConnect})

  var [socket] = useState(io(sA,cfg))

  var close = () => socket.close()

  function clientInit(){
  	socket.connect()

  	return function(){
  	  return close()
  	}
  }

  function join(){
  	socket.emit(
  	  'join',
  	  ids
  	)
  }

  socket.on('connect',() => {
  	if(ids) join()
  })

  useEffect(() => clientInit(),[])

  return [socket]
}

export {useSocketIo}


/* 
 * this hooks is use to auto disconnect 
 * from socket when it's not needed again
*/

/* 
 * this hooks would let you pass your certain id 
 * to create your room to connected with other 
 * user who doens't know your socketid but knows
 * id that you pass into parameter, such as your userId
*/