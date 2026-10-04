import { createSlice } from "@reduxjs/toolkit";

export const adminTaskSlice = createSlice({
  name: "AdminTask",

  initialState: {
    task: [],
    totalTask: 0,
  },

  reducers: {
    addAdminTask: (state, action) => {
      state.task = action.payload.allTask || [];
      state.totalTask = action.payload.totalTask || 0;
    },

    addAdminSingleTask: (state, action) => {
      state.task.unshift(action.payload);
      state.totalTask += 1;
    },

    updateAdminTask: (state, action) => {
      const updatedTask = action.payload;

      const index = state.task.findIndex(
        (item) => item._id === updatedTask._id
      );

      if (index !== -1) {
        state.task[index] = updatedTask;
      }
    },

    deleteAdminTask : (state, action) => {
        state.task = state.task.filter((item) => item._id !== action.payload)
        state.totalTask -= 1;
    }
  },
});

export const {
  addAdminTask,
  addAdminSingleTask,
  deleteAdminTask,
  updateAdminTask
} = adminTaskSlice.actions;

export default adminTaskSlice.reducer;
