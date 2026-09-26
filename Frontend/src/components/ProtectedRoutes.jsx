import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import {addUserData} from '../utlis/Redux/userSlice'
import Loading from '../components/Loading'

const ProtectedRoutes = () => {
   const userData = useSelector((state) => state.user)
   const dispatch = useDispatch()
   const nav = useNavigate()

   useEffect(() => {
          axios.get(import.meta.env.VITE_BACKEND_URL + "/auth/profile", {withCredentials : true})
          .then((res) => {
            dispatch(addUserData(res.data.data))
          })
          .catch(() => {
            nav("login")
          })
   }, [])

   if(!userData){
        return <Loading />
   }

   return <Outlet />
}

export default ProtectedRoutes
