import { api } from './api'
import axios from 'axios'

export const createTask = (employeeId, data) => {
  return axios.post(
    `${api}/admin/tasks/employee/${employeeId}`,
    data,
    { withCredentials: true }
  );
};

// Get All task
export const getAllTask = () => {
  return axios.get(
    `${api}/admin/tasks`,
    { withCredentials: true }
  );
};