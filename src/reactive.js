import {makeVar} from '@apollo/client'

var reactive = makeVar({
  auth: false,
  user: null
})


export {reactive}