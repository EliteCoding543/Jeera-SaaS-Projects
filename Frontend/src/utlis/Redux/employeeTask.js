import { createSlice } from "@reduxjs/toolkit";

export const taskSliceEmployee = createSlice({
    name: "task",

    initialState: {
        task: [],
        totalTask: 0
    },

    reducers: {
        addTasks: (state, action) => {
            state.task = action.payload;
            state.totalTask = action.payload.length;
        },

        addTask: (state, action) => {
            state.task.unshift(action.payload);
            state.totalTask += 1;
        }
    }
});

export const { addTasks, addTask } = taskSliceEmployee.actions;

export default taskSliceEmployee.reducer;