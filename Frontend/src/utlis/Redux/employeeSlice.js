import { createSlice } from "@reduxjs/toolkit";

export const employeesSlice = createSlice({
  name: "Employee",

  initialState: {
    employee: [],
    totalEmployee: 0,
  },

  reducers: {
    // Saare employees Redux mein set karna
    addEmployees: (state, action) => {
      state.employee = action.payload.employees;
      state.totalEmployee = action.payload.totalEmployees;
    },

    // Employee ka Active / Inactive status update karna
    updateEmployeeStatus: (state, action) => {
      const { employeeId, isActive } = action.payload;

      const employee = state.employee.find(
        (item) => item._id === employeeId
      );

      if (employee) {
        employee.isActive = isActive;
      }
    },

    // Chat employee store in redux
    chatAllEmployee : (state, action) => {
      state.employee = action.payload.AllEmployee,
      state.totalEmployee = action.payload.totalEmployee
    }
  },
});

export const {
  addEmployees,
  updateEmployeeStatus,
  chatAllEmployee,
} = employeesSlice.actions;

export default employeesSlice.reducer;