import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {
  LayoutDashboard,
  Building2,
  UsersRound,
} from "lucide-react";
import axios from "axios";
import OnwerDashboradPre from "./OnwerDashboradPre";
import DashboardLoading from "./DashboardLoading";
import OrgDashboard from "./OrgDashboard";
import Administrator from "./Administrator";
import { useSelector } from "react-redux";

const links = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    key: "dashboard",
  },
  {
    label: "Organizations",
    icon: Building2,
    key: "organization",
  },
  {
    label: "Administrators",
    icon: UsersRound,
    key: "administrator",
  },
];

const OwnerDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [allOrgs, setAllOrgs] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[adminisModal, setAdminsModal] = useState(false)

  const user = useSelector((store) => store.user)
  // Active page state
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    if (user?.role !== "owner") return;
    setLoading(true);
    const p = Promise.all([
      axios.get(
        import.meta.env.VITE_BACKEND_URL + "/analytics",
        {
          withCredentials: true,
        }
      ),

      axios.get(
        import.meta.env.VITE_BACKEND_URL +
          "/analytics/get-all-orgs-data",
        {
          withCredentials: true,
        }
      ),
    ]);

    p.then((arr) => {
      setAnalytics(arr[0].data.data);
      setAllOrgs(arr[1].data.data);
    }).catch((error) => {
      console.log("Owner Dashboard Error:", error);
    }).finally(() => {
      setLoading(false);
    });
  }, []);
// console.log(analytics)
  // Active organizations
  const activeOrganizations =
    allOrgs?.filter((org) => org.isActive).length || 0;

  // Inactive organizations
  const inactiveOrganizations =
    allOrgs?.filter((org) => !org.isActive).length || 0;

  // Total organizations
  const totalOrganizations =
    allOrgs?.length || 0;

  // Active percentage
  const activePercentage = totalOrganizations
    ? Math.floor(
        (activeOrganizations / totalOrganizations) * 100
      )
    : 0;

  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      {/* Navbar */}
      <Navbar />

      <div className="flex">

        {/* Sidebar */}
        <Sidebar
          links={links}
          activePage={activePage}
          setActivePage={setActivePage}
        />

        {/* =====================================================
            DASHBOARD PAGE
        ====================================================== */}

        {activePage === "dashboard" && (
          <>
            {loading ? (
              <DashboardLoading />
            ) : analytics ? (

              <OnwerDashboradPre
                analytics={analytics}
                allOrgs={allOrgs}
                user={user}
                activeOrganizations={activeOrganizations}
                inactiveOrganizations={inactiveOrganizations}
                totalOrganizations={totalOrganizations}
                activePercentage={activePercentage}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setActivePage={setActivePage}
              />

            ) : null}
          </>
        )}

        {/* =====================================================
            ORGANIZATION PAGE
        ====================================================== */}

        {activePage === "organization" && (
          loading ? <DashboardLoading /> : <OrgDashboard 
            analytics={analytics}
            allOrgs={allOrgs || []}
            setAllOrgs={setAllOrgs}
            activeOrganizations={activeOrganizations}
            inactiveOrganizations={inactiveOrganizations}
            totalOrganizations={totalOrganizations}
            activePercentage={activePercentage}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        )}

        {/* =====================================================
            ADMINISTRATOR PAGE
        ====================================================== */}

        {activePage === "administrator" && (
          loading ? <DashboardLoading /> : <Administrator 
          analytics={analytics} 
          setAnalytics={setAnalytics}
          allOrgs={allOrgs || []} 
          setAllOrgs={setAllOrgs}
          adminisModal={adminisModal} 
          setAdminsModal={setAdminsModal}
          />
        )}

      </div>
    </div>
  );
};

export default OwnerDashboard;
