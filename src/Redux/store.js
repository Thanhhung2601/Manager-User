import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import tableSlice from './slices/userTableSlice'

const rootReducer = combineReducers({
    user: userSlice,
    table: tableSlice,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store
