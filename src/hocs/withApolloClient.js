import {ApolloConsumer} from '@apollo/client'

function withApolloClient(Component) {
  function WithApolloClient(props){
    return (
      <ApolloConsumer>
        {(client) => (
          <Component
            {...props}
            client={client}
          />
        )}   
      </ApolloConsumer>
    )
  }

  return WithApolloClient
}

export {withApolloClient}