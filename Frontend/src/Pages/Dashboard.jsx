import React from "react";
import { useSelector } from "react-redux";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import OwnerDashboard from "../components/Dashboard/OwnerDashboard";
import EmployeeDashborad from "../components/Employee/EmployeeDashborad";


const Dashboard = () => {
  const user = useSelector(store => store.user);
  // console.log("DASHBOARD USER:", user);
  // console.log("DASHBOARD ROLE:", user?.role);

  if(user.role == "owner")
  {
    return <OwnerDashboard />
  }
  else if(user.role == "admin")
  {
    return <AdminDashboard />
  }
  else if(user.role == "employee")
  {
    return <EmployeeDashborad />
  }


  return null

};

export default Dashboard;