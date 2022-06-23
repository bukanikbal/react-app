import {useState,useEffect} from 'react'
import {useLazyQuery,gql} from '@apollo/client'
import {reactive} from '../reactive'
import {AuthQuery} from '../graphql/query'
import {withState} from '../hocs/withState'


function Login({state}){
  var [variables,setVariables] = useState({
    username:'',password:''
  })

  var [loginObj,setLoginObj] = useState({
    variables,fetchPolicy:'no-cache'
  })

  var [runAuth,authState] = useLazyQuery(
    AuthQuery,loginObj
  )

  function pushVariablesChg(key,val){
  	setVariables({
  	  ...variables,
  	  [key]:val
  	})
  }

  function onSubmitFunc(event){
    event.preventDefault()
    setLoginObj((obj) => {
      var newObj = {
      	...obj,
      	variables
      }

      return newObj
    })
    
    runAuth()
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

  useEffect(() => authStatus(authState),[authState])

  return <>
    <form onSubmit={onSubmitFunc}>
      <input 
        type="text"
        placeholder="username"
        onKeyUp={({target}) => {
          pushVariablesChg(
            'username',
            target.value
          )
        }}
      />
      <input 
        type="password"
        placeholder="password"
        onKeyUp={({target}) => {
          pushVariablesChg(
            'password',
            target.value
          )
        }}
      />
      <button type="submit">
        {authState.loading && (
          <span>loading...</span>
        )}
        {!authState.loading && (
          <span>Login now!!</span>
        )}
      </button>
      {authState.error && (
        <p>{authState.error.message}</p>
      )}
      {state && (
        <p>{state.warning}</p>
      )}
    </form>
  </>
}

export default withState(Login)



 