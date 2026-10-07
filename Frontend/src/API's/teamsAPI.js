import axios from "axios";
import { api } from "./api";


export const createTeamAdmins = (teamsData) => {
    return axios.post(`${api}/admin/teams`,
        teamsData,
        { withCredentials : true }
    )
}

// active and Inactive teams by Admin
export const activeTeam = (id) => {
    return axios.patch(`${api}/admin/teams/${id}`,
        {},
        {
            withCredentials : true
        }
    )
}

export const deActiveTeam = (id) => {
    return axios.delete(`${api}/admin/teams/${id}`, 
        {
            withCredentials : true
        }
    )
}
export const getAllTeams = () => {
    return axios.get(`
        ${api}/admin/teams`,
        {
            withCredentials : true
        }
    )
}
