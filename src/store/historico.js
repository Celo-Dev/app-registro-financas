import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'historico',
  initialState: {
    list: []
  },
  reducers: {
    setHistorico: (state, action) => {
      const newList = [];

      action.payload.forEach((childItem) => {
        newList.push({
          key: childItem.key,
          tipo: childItem.val().tipo,
          valor: childItem.val().valor
        });
      });

      state.list = newList.reverse();
    }
  }
})

export const { setHistorico } = counterSlice.actions

export default counterSlice.reducer