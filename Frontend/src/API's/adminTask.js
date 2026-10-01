import axios from "axios";

const api = import.meta.env.VITE_BACKEND_URL;
export const getAllAdminTask = () => {
    return axios.get(api + 
        "/admin/tasks",
        {
            withCredentials : true
        }
    )};