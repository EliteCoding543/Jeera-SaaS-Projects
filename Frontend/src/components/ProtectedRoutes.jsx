import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import {addUserData} from '../utlis/Redux/userSlice'
import Loading from '../components/Loading'
import { api } from '../API\'s/api'

const ProtectedRoutes = () => {
   const userData = useSelector(state => state.user)
   const dispatch = useDispatch()
   const nav = useNavigate()

   useEffect(() => {
          axios.get( `${api}/auth/profile`, 
            {
              withCredentials : true
            }
          )
          .then((res) => {
            dispatch(addUserData(res.data.data))
            // console.log(addUserData(res.data.data))
          })

      .catch((error) => {
        console.log("Profile error:", error.response?.data);
        nav("/login");      
      })
   }, [dispatch, nav])

   if(!userData){
        return <Loading />
   }

   return <Outlet />
}

export default ProtectedRoutes
