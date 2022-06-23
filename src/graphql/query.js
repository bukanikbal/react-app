import {gql} from '@apollo/client'

var AuthQuery = gql`
  query runAuth($username:String,$password:String){
  	auth(username:$username,password:$password){
  	  _id
  	}
  }
`

var RecentlyQuery = gql`
  query RecenltyMessages($_id:String){
  	recently(_id:$_id){
  	  _id
  	  sender {
        _id
  	  	profile {
  	  	  firstName
          lastName
          picture
  	  	}
  	  }
  	  receiver {
        _id
  	  	profile {
          firstName
          lastName
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

var MessagesQuery = gql`
  query Messages($sender:String,$receiver:String){
    all(sender:$sender,receiver:$receiver){
      _id
      sender
      receiver
      content {
        type
        value
      }
      uniqueId
      send
    }
  }
`

var newQuery = gql`
  mutation newMessage($param: newMessage){
    new(param: $param){
      _id
      sender
      receiver
      content {
        type
        value
      }
      uniqueId

    }
  }
`

var searchQuery = gql`
  query searchUser($query:String){
    search(query:$query){
      _id
      profile{
        firstName
        picture
      }
    }
  }
`


export {AuthQuery,RecentlyQuery,MessagesQuery,newQuery,searchQuery}