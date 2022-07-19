import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'amount',
  initialState: {
    value: 0,
  },
  reducers: {
    setAmount: (state, action) => {
    
      state.value = action.payload
    },
  
  },
})

export const { setAmount } = counterSlice.actions

export default counterSlice.reducer