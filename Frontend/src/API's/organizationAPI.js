import axios from "axios";
import { api } from "./api";

export const createOrgs = (orgData) => {
   return axios.post(`${api}/owner/`, 
    orgData,
    {
        withCredentials : true
    }
   )
}

export const activeOrgs = (id, name) => {

  return axios.patch(`${api}/owner/${id}`, 
    {
        name : name,
        isActive : true
    },
    {
        withCredentials : true
    }
  )
}
export const deactivateOrg = (id) => {
    return axios.delete(`${api}/owner/${id}`, 
        {
            withCredentials : true
        }
    )
}