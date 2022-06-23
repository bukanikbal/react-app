import { App } from './App';
import { render } from 'react-dom';
import { reactive } from './reactive'
import { Preloader } from './components/Preloader'
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client'
import { usePersistState } from './custom_hooks/usePersistState'
import { useLocalStorage } from './custom_hooks/useLocalStorage'
import { ApolloClient,InMemoryCache,ApolloProvider } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_ADDRESS,
  cache: new InMemoryCache({
    addTypename: false
  })
});


function Main(){
  var Reactive = useReactiveVar(reactive)
  var LocalStorage = useLocalStorage(Reactive) 
  var doneRefresh = usePersistState(localStorage)


  if(!doneRefresh){
    return (
      <StrictMode>
        <Preloader
          error={false}
        />
      </StrictMode>
    )
  }

  return (
    <StrictMode>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </StrictMode>
  )
}

render(<Main />,document.getElementById('root'));
