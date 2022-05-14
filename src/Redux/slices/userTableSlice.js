import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllUserByPage } from '../../api'
import { toast } from 'react-toastify'

const initialState = {
    table: null,
    loading: false,
}

const tableSlice = createSlice({
    name: 'tableSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserTable.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchUserTable.fulfilled, (state, action) => {
                state.table = action.payload
                state.loading = false
            })
    },
})
export const fetchUserTable = createAsyncThunk(
    'userTableSlice/fetchUserTable',
    async (page) => {
        try {
            const { data } = await getAllUserByPage(page)
            return data
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }
)

export const actions = tableSlice.actions

export default tableSlice.reducer
