import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getAllTeams } from "../API's/teamsAPI.js";
import { addTeams } from "../utlis/Redux/teamSlice.js";

import { getAllAdminTask } from "../API's/adminTask.js";
import { addAdminTask } from "../utlis/Redux/adminTaskSlice.js";

import { getEmployee } from "../API's/employee.js";
import { addEmployees } from "../utlis/Redux/employeeSlice.js";


const useAdminDashboardData = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await getAllTeams();

        const adminTask = await getAllAdminTask();

        dispatch(
          addTeams(res.data.data)
        );

        dispatch(
          addAdminTask(adminTask.data.data)
        );

        const teamsData = res.data.data.teams;

        if (teamsData.length > 0) {
          const teamId = teamsData[0]._id;

          const allEmployee = await getEmployee(teamId);

          dispatch(
            addEmployees(allEmployee.data.data)
          );
        }

      } catch (error) {
        console.log(
          "Dashboard Fetch Error:",
          error
        );
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