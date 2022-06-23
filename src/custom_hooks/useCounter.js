import {useState} from 'react'

function useCounter(val,onChg){
  var [counter,setCounter] = useState(val)

  async function increment(){
    await setCounter(() => {
      return counter + 1
    })

    onChg(
      counter
    )
  }

  
  return [counter,increment]
}

export {useCounter}

