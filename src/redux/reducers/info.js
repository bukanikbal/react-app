import {createSlice} from '@reduxjs/toolkit';

const info = createSlice({
  name : 'info',
  initialState : {
  	id: null,
    profile: null
  },
  reducers : {
    setLogin : (state,action) => {
      state.id = action.payload.id
      state.profile = action.payload.profile
    }
  }
})

export default info.reducer

export const {setLogin} = info.actions

