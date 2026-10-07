import axios from "axios";
import { api } from "./api";

export const createEmployee = (teamId, data) => {
    return axios.post(`${api}/admin/teams/${teamId}/employees`, 
        data,
        {
            withCredentials : true
        }
    )
}
export const activeEmployee = (employeeId) => {
   return axios.patch(`${api}/admin/employees/${employeeId}`, 
    {
        isActive : true
    },
    {
        withCredentials : true
    }
   )
}
export const deActiveEmployee = (employeeId) => {
    return axios.delete(`${api}/admin/employees/${employeeId}`,
        {
            withCredentials : true
        }
    )
}

export const getEmployee = (teamId) => {
    return axios.get(
        `${api}/admin/teams/${teamId}/employees`,
        {
            withCredentials: true
        }
    );

};

// Now get employee me task
export const getEmployeTask = () => {
    return axios.get(`${api}/employee/tasks`, 
        {
            withCredentials : true
        }
    )
}

// Chats employee 
export const getAllEmployeesChats = () => {
    return axios.get(`${api}/chat`, 
        {
            withCredentials : true
        }
    )
}

export const getConversation = (userId) => {
    return axios.get(`${api}/chat/${userId}/messages`, {
        withCredentials: true
    })
}
