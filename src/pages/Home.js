import {useState,useEffect} from 'react'
import {reactive} from '../reactive'
import {useQuery,useLazyQuery} from '@apollo/client'
import {RecentlyQuery} from '../graphql/query'
import {searchQuery} from '../graphql/query'
import {Preloader} from '../components/Preloader'
import {Link} from 'react-router-dom'

function List({message}){
  var {sender,receiver} = message

  var [imagePath,setImagesPath] = useState(
    process.env.REACT_SERVER_ADDRESS
  )

  function getImage({profile}){
    return `${imagePath}/images/${profile.picture}`
  }

  if(message.sender._id == reactive().user._id){
    return (
      <li className="collection-item avatar">
          <Link to="/messages" state={{info:receiver}}>
          <img 
            src={getImage(receiver)}
            className="circle"
          />
          <span className="title">
            {receiver.profile.firstName}
          </span>
          <p>{message.content.value}</p>
        </Link>
      </li>
    )
  }

  return (
    <li className="collection-item avatar">
      <Link to="/messages" state={{info:sender}}>
        <img 
          src={getImage(sender)}
          className="circle"
        />
        <span className="title">
          {sender.profile.firstName}
        </span>
        <p>{message.content.value}</p>
      </Link>
    </li>
  )
}

function Search(){
  var [variables,setVariables] = useState({
    query : ''
  })

  var [searchObj,setSearchObj] = useState({
    variables,fetchPolicy:'no-cache'
  })
 
  var [run,{loading,error,data}] = useLazyQuery(
     searchQuery,searchObj
  )

  var [imagePath,setImagesPath] = useState(
    'http://192.168.43.225:5000/images'
  )

  function getImage({profile}){
    return `${imagePath}/${profile.picture}`
  }

  async function pushChange({value}){
    

    await setVariables((currentVar) => {
      var Var = {
        ...currentVar,
        query: value
      }
      return Var
    })

    await setSearchObj((currentObj) => {
      var newObject = {
        ...currentObj,
        variables
      }

      return newObject
    })

    run()
  }
  

  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <form>
            <div className="input-field">
              <input id="search" 
                type="search" 
                placeholder="search"
                onChange={({target}) => {
                  pushChange(target)
                }}
              />
              <span>loading</span>
            </div>
          </form>
        </div>
      </nav>
      {loading && (
        <div class="progress">
          <div 
            className="indeterminate"
          />
        </div>
      )}
      {error && (
        <div class="progress">
          <div 
            className="determinate red" 
            style={{width:'100%'}} 
          />
        </div>
      )}
      {data && (
        data.search.map((user) => (
          <ul className="collection">
            <li className="collection-item avatar">
              <Link to="/messages" state={{info:user}}>
                <img 
                  src={getImage(user)}
                  className="circle"
                />
                <span className="title" style={{lineHeight:'40px'}}>
                  {user.profile.firstName}
                </span>
              </Link>
            </li>
          </ul>
        ))
      )}
    </>
  )
}

function Recently(){
  var [recentlys,setRecentlys] = useState([])

  var [variables,setVariables] = useState({
    _id : reactive().user._id
  })

  var [recently,setRecently] = useState({
    variables,fetchPolicy:'no-cache'
  })

  var {loading,error,data} = useQuery(
    RecentlyQuery,recently
  )

  function onResult(){
    if(data) setRecentlys(
      data.recently
    )
  }

  useEffect(() => onResult(),[data])


  if(loading){
  	return (
      <Preloader />
    )
  }

  if(error){
  	return (
      <Preloader
        error={error}
      />
    )
  }

  if(data.recently.length < 1){
    return (
      <Preloader
        error={{
          message:'no recently message,create one by send a user message'
        }}
      />
    )
  }


  return (
    <ul className="collection">
      {recentlys.map((message) => (
        <List 
          key = {
            message._id
          }
          message = {
            message
          }
        />
      ))}
    </ul>
   )
}

function Home(){
  return (
  	<div className="App-Home">
      <Search />
  	  <Recently/>
  	</div>
  )
}

export {Home}