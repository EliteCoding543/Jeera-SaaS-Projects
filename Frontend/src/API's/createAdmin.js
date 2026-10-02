import axios from "axios";
import { api } from "./api";

export const createAdministrator = (organizationId, adminData) => {
    return axios.post(`${api}/owner/organization/${organizationId}/admins`, adminData,
        {
            withCredentials : true
        }
    )
}
export const activedAdmins = (id) => {
    return axios.patch(`${api}/owner/admins/${id}`,
        {},
        {
            withCredentials : true
        },
    )
}

export const deactivateAdmin = (id) => {
    return axios.delete(`${api}/owner/admins/${id}`, 
        {
            withCredentials : true
        }
    )
}