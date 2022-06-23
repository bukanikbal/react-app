import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {reactive} from '../graphql/reactive'
import {useReactiveVar} from '@apollo/client'

var Message = styled.li`
  display: flex;
  flex-direction:column;
  justify-content:center;
`


function List({message}){
   var {user} = useReactiveVar(reactive)

  if(message.sender._id == user._id){
  	return(
      <>
    <Message className="collection-item avatar">
      <Link to="/message" state={{info:message.receiver}}>
        <img 
          src={`http://localhost:5000/images/${message.receiver.profile.picture}`} 
          className="circle" alt="pp"
        />
        <span className="title">{message.receiver.profile.fullName}</span>
        <p>{message.content.value}</p>
      </Link>
    </Message>
    </>
  	)
  }
  return (
  <>
    <Message className="collection-item avatar">
      <Link to="/message" state={{info:message.sender}}>
        <img 
          src={`http://localhost:5000/images/${message.sender.profile.picture}`} 
          className="circle" alt="pp"
        />
        <span className="title">{message.sender.profile.fullName}</span>
        <p>{message.content.value}</p>
      </Link>
    </Message>
  </>
  )
}

export {List}