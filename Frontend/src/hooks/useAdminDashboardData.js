import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getAllTeams } from "../API's/teamsAPI.js";
import { addTeams } from "../utlis/Redux/teamSlice.js";

import { getAllAdminTask } from "../API's/adminTask.js";
import { getEmployee } from "../API's/employee.js";
import { addEmployees } from "../utlis/Redux/employeeSlice.js";
import { addAdminTask } from "../utlis/Redux/adminTaskSlice.js";



const useAdminDashboardData = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Teams
        const res = await getAllTeams();

        dispatch(addTeams(res.data.data));

        const teamsData = res.data.data.teams;

        // Employees
        const employeeResponses = await Promise.all(
          teamsData.map((team) => getEmployee(team._id))
        );

        const employees = employeeResponses.flatMap(
          (res) => res.data.data.employees
        );

        dispatch(
          addEmployees({
            employees,
            totalEmployees: employees.length,
          })
        );

        // Tasks
        const taskRes = await getAllAdminTask();

        console.log("Get Task Response :", taskRes.data);

        dispatch(
          addAdminTask({
            allTask: taskRes.data.data.allTask,
            totalTask: taskRes.data.data.totalTask,
          })
        );

      } catch (error) {
        console.log("Dashboard Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [dispatch]);

  return {
    loading
  };
};

export default useAdminDashboardData;
