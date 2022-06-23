import {useState,useEffect,useRef} from 'react'
import {createContext,useContext} from 'react'
import {gql} from '@apollo/client'
import {withMainState} from '../hocs/withMainState'
import {useQuery,useMutation} from '@apollo/client'
import {reactive} from '../reactive'
import {useSocketIo} from '../custom_hooks/useSocketIo'
import {useUpload} from '../firebase/firebase-hooks'
import {MessagesQuery,newQuery} from '../graphql/query'
import {Preloader} from '../components/Preloader'
import {ObjectId} from "bson"


function Header({info}){
	var [imagePath] = useState(
    'http://localhost:5000/images'
  )

  function getImage({picture}){
    return `${imagePath}/${picture}`
  }


  return (
    <ul className="collection">
      <li className="collection-item avatar">
        <img 
          src={getImage(info.profile)} 
          className="circle" 
        />
        <span className="title">
          {info.profile.firstName}
        </span>
      </li>
    </ul>
  )
}


function List({_id,message}){
  var [send,setSend] = useState(message.sender == _id)

  if(message.content.type == "txt"){
     return (
      <div className="col s12 white-text">
        <div className="row">
          <div className={send ? "col s6" : "col s6 offset-s6"}>
            <div className={send ? "card-panel teal" : "card-panel red"}>
              <span>{message.content.value}</span>
            
              {send && message.send && (
                <a href="#!" class="secondary-content white-text">
                  <i class="material-icons">
                    done_all
                  </i>
                </a>
              )}

              {send && !message.send && (
                <a href="#!" class="secondary-content white-text">
                  <i class="material-icons">
                    done
                  </i>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    )  
  }
  else{
    return (
      <div className="col s12">
        <div className="row">
          <div className={send ? "col s6" : "col s6 offset-s6"}>
            <div className="card">
              <div className="card-image">
                <img
                  className="responsive-img"
                  src={message.content.value}
                />

                {send && !message.send && (
                  <span className="card-title img-title right-align">
                    <i className="material-icons">done</i>
                  </span>
                )}

                {send && message.send && (
                  <span className="card-title img-title right-align">
                    <i className="material-icons">done_all</i>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function Fetch({_id,info,setMessages,messages}){
  var [variables,setVariables] = useState({
  	sender: _id,
  	receiver : info._id
  })

  var [fetchObj,setFetchObj] = useState({
  	variables,fetchPolicy: 'no-cache'
  })

  var {loading,error,data} = useQuery(
    MessagesQuery,fetchObj
  )


  if(loading){
  	return <>loading</>
  }

  if(error){
  	return <>error</>
  }

  if(data && !messages){
    setMessages(current => {
    	return data.all
    })

    return <>memuat</>
  }

  if(messages){
  	return (
  	  <div className="App-Messages">
  	    <div className="row row-message">
          <div className="container container-message">
            <div className="row">
              {messages.map((message) => (
                <List 
                  _id = {
                	  _id
                  }
                  key = {
                	  message._id
                  }
                  message = {
                	  message
                  }
                />
              ))}
            </div>
          </div>
        </div>
  	  </div>
  	)
  }
}


function SendFile({run,info,setMessages}){
  var [pending,err,upload] = useUpload({
    onUploaded
  })

  function send(Param){
    var param = {
      ...Param,
      ...info
    }

    var variables = {
      param
    }

    run({
      variables,
      fetchPolicy:'no-cache'
    })
  }

  function onUploaded(url,_id){
    var content = {
      type:'img',
      value:url
    }

    send({
      content,
      _id,
    })
  }

  function getMessageId(){
    var __id = new ObjectId()
    var _id = __id.toString()
    
    return _id
  }

  function createFileObj(file){
    var url = URL.createObjectURL(
      file
    )

    return url
  }

  function setPreview(_url,_id){
    setMessages((current) => {
      var content = {
        type:'img',
        value:_url
      }

      var newMessage = {
        ...info,
        send:false,
        _id,content
      }

      return [
        ...current,
        newMessage
      ]
    })
  }

  function onChg(files){
    var _id = getMessageId()
    var url = createFileObj(
      files[0]
    )

    setPreview(
      url,
      _id
    )

    upload(
      files[0],
      _id
    )
  }


  return (
    <div className="col form-button valign-wrapper">
      {!pending && (
        <input 
          type="file" 
          onChange={({target}) => (
            onChg(
              target.files
            )
          )}
        />
      )}
      {pending && (
        <p className="white-text">
          iploading...
        </p>
      )}
    </div>
  )
}

function SendTxt({setTextValue}){

  function onChange({value}){
    setTextValue((currentValue) => {
      return value
    })
  }

  return (
  	<>
    <div className="col l11 valign-wrapper">
			<textarea 
				className="materialize-textarea white-text"
        onChange={({target}) => onChange(target)}
				placeholder="new message"
				style={{
				  marginBottom:'0',
					boxShadow:'none',
					border:'none'
				}}
			/>
		</div>
		<div className="col form-button valign-wrapper">
			<button type="submit" className="btn black white-text">
	        <i className="material-icons">send</i>
			</button>
	  </div>
	  </>
  )
}

function Send({setMessages,info}){

  var [textValue,setTextValue] = useState(null)
  var [run,{loading,error,data}] = useMutation(
    newQuery
  )

  function send(Param,content){
    var param = {
      ...Param,
      ...info,
      content,
    }
    
    console.log(
      param
    )
  }

  function send(event){
    var __id = new ObjectId()
    var _id = __id.toString()

    var val = {
      value:textValue
    }
    
    var content = {
      ...val,
      type:'txt'
    }

    var param = {
      ...info,
      content,
      _id
    }

    var variables = {
      param
    }

    event.preventDefault()

    run({
      variables:variables,
      fetchPolicy:'no-cache'
    })

    setMessages((current) => {
      var newMessage = {
        ...param,
        send:false
      }

      return [
        ...current,
        newMessage
      ]
    })

  }

	return (
	  <form onSubmit={send} className="form-message">
			<div className="row row-form black">
        <SendTxt 
          setTextValue = {
            setTextValue
          }
        />
        <SendFile
          info = {
            info
          }
          run = {
            run
          }
          setMessages = {
            setMessages
          }
        />
			</div>
		</form>
	)
}


function Messages({user,state}){
  var [sendInfo,setSendInfo] = useState({
  	sender: user._id,
  	receiver: state.info._id,
  	uniqueId: createUniqueId(
      user._id,
      state.info._id
  	)
  })

  var [messages,setMessages] = useState(
    null
  )

  var [socketIo] = useSocketIo(
    'http://192.168.43.225:5000',
    createUniqueId(
      user._id,
      state.info._id
    )
  )

  function strToArray(param,limiter){
		return param.split(limiter)
	}

  function _idFilter(_id){
		var number = [
			'1','2',
			'3','4',
			'5','6',
			'7','8',
			'9','0'
		]

		var _Id = _id.filter((c) => {
			var [filter] = number.filter(
				(n) => n == c
			)

			return filter
		})

		return parseInt(_Id.join(''))
	}

  function createUniqueId(_id1,_id2){
		var _Id1 = _idFilter(
			strToArray(
				_id1,""
			)
		)
		var _Id2 = _idFilter(
			strToArray(
				_id2,""
			)
		)
		
		var _id = _Id1 + _Id2

		return _id.toString()
	}

  function onMessage(message){
    var [filtered] = messages.filter(
      ({_id}) => _id == message._id
    )

    if(filtered){
      var index = messages.indexOf(
        filtered
      )

      var newMessages = messages.map(
        (message) => message
      )

      newMessages[index] = {
        ...filtered,
        send:true
      }

      setMessages((current) => {
        return newMessages
      })
    }
    else{
      var newMessage = {
        ...message,
        send:true
      }

      setMessages(() => {
        return [
          ...messages,
          newMessage
        ]
      })
    }
  }

  socketIo.off('message').on(
    'message',onMessage
  )



  return (
    <div className="App-Messages">
      <Header
        info = {
        	state.info
        }
      />
      <Fetch
        _id = {
          user._id
        }
        info = {
          state.info 
        }
        messages = {
        	messages
        }
        setMessages = {
        	setMessages
        }
      />
      <Send
        info = {
        	sendInfo
        }
        setMessages = {
        	setMessages
        }
      />
    </div>
  )
}

export default withMainState(
  Messages
)


