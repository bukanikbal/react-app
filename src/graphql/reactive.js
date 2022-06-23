import {makeVar} from '@apollo/client'

var reactive = makeVar({
  auth: false,
  user: null
})

var messages = makeVar([])

export {reactive,messages}