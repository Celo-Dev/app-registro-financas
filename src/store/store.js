import { configureStore } from '@reduxjs/toolkit'

import amount from './amount';
import historico from './historico';

export default configureStore({
  reducer: {
    amount: amount,
    historico: historico

  },
})