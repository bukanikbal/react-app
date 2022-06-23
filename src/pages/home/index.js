import {useState} from 'react'
import {useReactiveVar} from '@apollo/client'
import {reactive} from '../../graphql/reactive'
import {useSocketIo} from '../../custom_hooks/useSocketIo'

function Home(){
  var {user:{_id}} = reactive()

  
  var socket = useSocketIo(
    `http://localhost:5000`,
    _id
  )


  function onChange({value}){
    // setOtherId(value)
  }

  function onSubmit(e){
    e.preventDefault()
    socket.emit(
      'test',
      _id
    )
  }

  
  return (
  	<div class="App Home">
  	  <p>your _id : {_id}</p>
  	  <form onSubmit={onSubmit}>
  	    <input 
  	      type="text" 
          onChange={({target}) => {
          	onChange(target)
          }}
  	    />
  	    <button type="submit">
  	      test
  	    </button>
  	  </form>
  	</div>
  )
}

export {Home}