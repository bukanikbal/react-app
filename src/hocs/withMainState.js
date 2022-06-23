import {useLocation} from 'react-router-dom'
import {reactive} from '../reactive'


function withMainState(Component){
  function WithMainState(props){
    var state = useLocation()


    return (
      <Component 
        {
          ...props
        }
        state = {
          state.state
        }
        user = {
          reactive().user
        }
      />
    )
  }

  return WithMainState
}

export {withMainState}