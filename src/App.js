import {reactive} from './reactive'
import {Routes,Route,Navigate} from 'react-router-dom'
import {useReactiveVar} from '@apollo/client'
import {Home} from './pages/Home'
import {NotFound} from './pages/NotFound'
import Messages from './pages/Messages'
import Login from './pages/Login'
import './App.css'


function App(){ 
  var Reactive = useReactiveVar(reactive)

  // authenicated routes

  if(Reactive.auth){
    return (
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/messages"
          element={<Messages />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    )
  }

  // unauthenticated routes

  return (
    <Routes>
      <Route
        path="/"
        element={<Login />}
      />
      <Route
        path="*"
        element={
          <Navigate 
            to="/" 
            state={{
              warning:'login first'
            }}
            replace
          />
        }
      />
    </Routes>
  )

}

export {App}
