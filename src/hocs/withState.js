import {useLocation} from 'react-router-dom'


function withState(Component){
  function WithState(props){
    var {state} = useLocation()

    return (
      <Component 
        {...props}
        state={state}
      />
    )
  }

  return WithState
}

export {withState}