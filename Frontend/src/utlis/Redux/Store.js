import { configureStore  } from '@reduxjs/toolkit'
import {  userSlice } from './userSlice'
import { teamsSlice } from '../Redux/teamSlice'
import { adminTaskSlice } from './adminTaskSlice';
import { employeesSlice } from './employeeSlice';

const Store = configureStore({
    reducer : {
        user : userSlice.reducer,
        teams : teamsSlice.reducer,
        task : adminTaskSlice.reducer,
        employee: employeesSlice.reducer,
    }
})

export default Store;
