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

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[adminisModal, setAdminsModal] = useState(false)

  // Active page state
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
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
    });
  }, []);

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
            {analytics ? (

              <OnwerDashboradPre
                analytics={analytics}
                allOrgs={allOrgs}
                activeOrganizations={activeOrganizations}
                inactiveOrganizations={inactiveOrganizations}
                totalOrganizations={totalOrganizations}
                activePercentage={activePercentage}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setActivePage={setActivePage}
              />

            ) : (

              /* =====================================================
                 LOADING
              ====================================================== */
                <DashboardLoading />
            )}
          </>
        )}

        {/* =====================================================
            ORGANIZATION PAGE
        ====================================================== */}

        {activePage === "organization" && (
          <OrgDashboard 
            analytics={analytics}
            allOrgs={allOrgs}
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
          <Administrator 
          analytics={analytics} 
          allOrgs={allOrgs} 
          adminisModal={adminisModal} 
          setAdminsModal={setAdminsModal}
          />
        )}

      </div>
    </div>
  );
};

export default OwnerDashboard;