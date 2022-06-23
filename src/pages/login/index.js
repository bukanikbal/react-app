import {useState,useEffect} from 'react'
import {useLazyQuery,gql} from '@apollo/client'
import {reactive} from '../../graphql/reactive'
import {useSocketIo} from '../../custom_hooks/useSocketIo'

function Login(){
  var Auth = gql`
    query userAuth($usr:String,$psswd:String){
      auth(username:$usr,password:$psswd){
        _id
      }
    }
  `

  var [variables,setVariables] = useState({
    username:'',password:''
  })

  var [loginObj,setLoginObj] = useState({
    variables,fetchPolicy:'no-cache'
  })

  var [auth,status] = useLazyQuery(
    Auth,loginObj
  )

  function test(){
    reactive({
      ...reactive(),
      auth: true
    })
  }

  function pushChange(key,val){
    setVariables({
      ...variables,
      [key]:val
    })
  }

  function onSubmit(event){
    event.preventDefault()
    setLoginObj((obj) => {
      return Object({
        ...obj,
        variables
      })
    })
    auth()
  }

  function onSuccessAuth({auth}){
    reactive({
      ...reactive(),
      auth: true,
      user: auth
    })
  }

  function authStatus({error,data}){
    if(error) console.log(error)
    if(data) onSuccessAuth(data)
  }

  useEffect(() => authStatus(status),[status])

  return <>
    <form onSubmit={onSubmit}>
      <input 
        type="text"
        placeholder="username"
        onKeyUp={({target}) => {
          pushChange(
            'usr',
            target.value
          )
        }}
      />
      <input 
        type="password"
        placeholder="password"
        onKeyUp={({target}) => {
          pushChange(
            'psswd',
            target.value
          )
        }}
      />
      <button type="submit">
        Login
      </button>
    </form>
  </>
}

export {Login}


