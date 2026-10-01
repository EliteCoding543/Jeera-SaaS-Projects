import axios from "axios";
import { api } from "./api";

export const getEmployee = (teamId) => {

    return axios.get(
        `${api}/admin/teams/${teamId}/employees`,
        {
            withCredentials: true
        }
    );

};