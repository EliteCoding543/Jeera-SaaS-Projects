import axios from "axios";

const api = import.meta.env.VITE_BACKEND_URL;
export const getAllTeams = () => {
    return axios.get(
        api + "/admin/teams",
        {
            withCredentials : true
        }
    )
}
