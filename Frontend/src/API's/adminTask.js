import axios from "axios";
import { api } from "./api";

export const updatedAdminTask = (taskId, data) => {
     return axios.patch(`${api}/admin/tasks/${taskId}`,
        data,
        {
            withCredentials : true
        }
     )
}

export const deletedAdminTask = (taskId) => {
    return axios.delete(`${api}/admin/tasks/${taskId}`,
        {
            withCredentials : true
        }
    )
}

export const getAllAdminTask = () => {
    return axios.get(`${api}/admin/tasks`,
        {
            withCredentials : true
        }
)};