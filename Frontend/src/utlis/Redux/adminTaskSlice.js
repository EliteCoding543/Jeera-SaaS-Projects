import { createSlice } from "@reduxjs/toolkit";

export const adminTaskSlice = createSlice({
    name : "AdminTask",
    initialState : {
        task : [],
        totalTask : 0
    },
    reducers : {
        addAdminTask : (state, action) => {
            state.task = action.payload.allTask,
            state.totalTask = action.payload.totalTask
        }
    }
})

export const { addAdminTask } = adminTaskSlice.actions