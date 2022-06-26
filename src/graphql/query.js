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
      read
    }
  }
`

var newQuery = gql`
  mutation newMessage($param: NewMessage){
    new(param: $param){
      _id
      read
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

var updateQuery = gql`
  mutation readUpdate($param: MessageStatus){
    read(param: $param){
      _id
      read
      sender
      receiver
      uniqueId
      content {
        type
        value
      }
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


export {
  AuthQuery,
  RecentlyQuery,
  MessagesQuery,
  newQuery,
  searchQuery,
  updateQuery
}