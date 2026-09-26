import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name : "User",
    initialState : null,
    reducers : {
        addUserData : (state, action) => {
            return action.payload
        }
    }
})

export const { addUserData } = userSlice.actions