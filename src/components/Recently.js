import styled from 'styled-components'
import {useState} from 'react'
import {List} from './List'
import {Preloader} from './Preloader'
import {reactive} from '../graphql/reactive'
import {useReactiveVar,useQuery,gql} from '@apollo/client'

var Collection = styled.ul`
  margin-top:0;
  margin-bottom:0
`

function Recently(){
  var {user} = useReactiveVar(reactive)

  var [variables,setVariables] = useState({
    ...user
  })

  var Messages = gql`
    query getRecently($_id: String){
      recently(_id: $_id){
        _id
        sender{
          _id
          profile{
            fullName
            picture
          }
        }
        receiver{
          _id
          profile{
            fullName
            picture
          }
        }
        content{
          type
          value
        }
      }
    }
  `

  var {loading,error,data} = useQuery(Messages,{
    variables,fetchPolicy:'no-cache'
  })
  
  if(loading){
    return <Preloader/>
  }

  if(!loading && error){
    return (
      <Preloader 
        error={error} 
      />
    )
  }

  return (
    <Collection className="collection">
      {data.recently?.map((col) => (
        <List 
          key={col._id} 
          message={col} 
        />
      ))}
    </Collection>
  )
  

  

}

export {Recently}