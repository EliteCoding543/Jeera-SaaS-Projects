import { createSlice } from "@reduxjs/toolkit";

export const employeesSlice = createSlice({
    name: "Employee",
    initialState: {
        employee: [],
        totalEmployee: 0

    },
    reducers: {
        addEmployees: (state, action) => {
            state.employee = action.payload.employees;
            state.totalEmployee = action.payload.totalEmployees;
        }

    }

});

export const { addEmployees } = employeesSlice.actions;