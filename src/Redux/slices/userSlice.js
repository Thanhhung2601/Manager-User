import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUser } from '../../api'
import { toast } from 'react-toastify'

const initialState = {
    user: null,
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload
        },
        logOut(state, action) {
            state.user = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            localStorage.setItem(
                'userProfile',
                JSON.stringify(action.payload.userLogin)
            )
            state.user = action.payload.userLogin
            action.payload.navigate('/')
        })
    },
})
export const fetchUser = createAsyncThunk(
    'userSlice/fetchUser',
    async (userData) => {
        console.log(userData)
        try {
            const { data } = await getUser(userData.valueInput)
            const userLogin = { ...userData.valueInput, token: data.token }
            return { userLogin, navigate: userData.navigate }
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }
)

export const actions = userSlice.actions

export default userSlice.reducer
