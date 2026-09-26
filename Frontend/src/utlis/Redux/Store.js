import { configureStore  } from '@reduxjs/toolkit'
import { addUserData } from './userSlice'


const Store = configureStore({
    reducer : {
        user : addUserData
    }
})

export default Store;