import { configureStore  } from '@reduxjs/toolkit'
import {  userSlice } from './userSlice'
import { teamsSlice } from '../Redux/teamSlice'
import { adminTaskSlice } from './adminTaskSlice';
import { employeesSlice } from './employeeSlice';
import { taskSliceEmployee } from './employeeTask';

const Store = configureStore({
    reducer : {
        user : userSlice.reducer,
        teams : teamsSlice.reducer,
        task : adminTaskSlice.reducer,
        employee: employeesSlice.reducer,
        employeeTask : taskSliceEmployee.reducer
    }
})

export default Store;
