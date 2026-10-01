import axios from "axios";
import { api } from "./api";

export const createAdministrator = (organizationId, adminData) => {
    return axios.post(`${api}/owner/organization/${organizationId}/admins`, adminData,
        {
            withCredentials : true
        }
    )
}