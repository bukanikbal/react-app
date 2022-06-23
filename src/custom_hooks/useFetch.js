import React from 'react';
import axios from 'axios';

function useFetch(reqObj,serverAddress){
  var [onInit,setOnInit] = React.useState(true)
  var [pending,setPending] = React.useState(false)
  var [result,setResult] = React.useState(null)
  var [error,setError] = React.useState(null)
  var [isCancel,setIsCancel] = React.useState(false)

  function afterInit(){
  	setOnInit(false)
  }

  async function fetch(rObj,cancelToken){
    var url = rObj.hasOwnProperty('path') ? `${serverAddress}/${rObj.path}` : serverAddress

    try{
      var result = await axios({
        url,headers : rObj.headers, method : rObj.method,
        data : rObj.data, params : rObj.params,cancelToken
      })
      setResult(result.data)
    }
    catch(err){
      if(axios.isCancel(err)){
      	setIsCancel(true)
      }
      else{
        if(err.response){
          setError(
            err.response.data
          )
        }
        else{
          setError(
            err.message
          )
        }
      }
    }
    finally{
      if(!isCancel){
      	setPending(false)
      }
    }
  }
  
  function preFetch(cancelToken){
  	if(reqObj){
  	  setError(null)
      setResult(null)
      setPending(true)
      setIsCancel(false)
  	  fetch(reqObj,cancelToken)
  	}
  }

  React.useEffect(() => afterInit(),[]);

  React.useEffect(() => {
    var CancelToken = axios.CancelToken;
    var source = CancelToken.source()
    preFetch(source.token)
    
    return () => {
      source.cancel()
    }
  },[reqObj])

  return [pending,result,error]
}

export default useFetch;