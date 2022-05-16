import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    createNewUser,
    getAllUserByPage,
    updateUser,
    deleteUser,
} from '../../api'
import { toast } from 'react-toastify'

const initialState = {
    table: null,
    loading: false,
    search: '',
}

const tableSlice = createSlice({
    name: 'tableSlice',
    initialState,
    reducers: {
        searchUserById(state, action) {
            state.search = action.payload
        },
        orderByFirstName(state, action) {
            if (action.payload === 'ASC') {
                state.table?.data.sort((a, b) =>
                    (a.first_name || a.name) > (b.name || b.first_name) ? 1 : -1
                )
            }
            if (action.payload === 'DESC') {
                state.table?.data.sort((a, b) =>
                    (a.first_name || a.name) > (b.name || b.first_name) ? -1 : 1
                )
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserTable.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchUserTable.fulfilled, (state, action) => {
                state.table = action.payload
                state.loading = false
            })
        builder.addCase(AcCreateNewUser.fulfilled, (state, action) => {
            state.table.data.unshift(action.payload)
        })
        builder.addCase(AcUpdateUser.fulfilled, (state, action) => {
            const newArr = state.table.data.map((user) => {
                if (user.id === action.payload.id) {
                    return action.payload
                } else {
                    return user
                }
            })
            state.table.data = newArr
        })
        builder.addCase(AcDeleteUser.fulfilled, (state, action) => {
            state.table.data = state.table.data.filter(
                (user) => user.id !== action.payload
            )
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

export const AcCreateNewUser = createAsyncThunk(
    'userTableSlice/AcCreateNewUser',
    async (userInfo) => {
        try {
            const { data } = await createNewUser(userInfo)
            return data
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }
)

export const AcUpdateUser = createAsyncThunk(
    'userTableSlice/AcUpdateUser',
    async (dataHandle) => {
        try {
            const { data } = await updateUser(dataHandle)
            return data
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }
)

export const AcDeleteUser = createAsyncThunk(
    'userTableSlice/AcDeleteUser',
    async (id) => {
        try {
            await deleteUser(id)
            return id
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }
)

export const actions = tableSlice.actions

export default tableSlice.reducer
