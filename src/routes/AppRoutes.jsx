import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpSignIn from "../features/signUpSignIn/SignUpSignIn";
import Navbar from "../features/navbar/Navbar";
import { Box } from "@mui/material";
import LoadingComponent from "../components/LoadingComponent";
import SideBar from "../features/sidebar/Sidebar";
import GroupComponent from "../features/group/GroupComponent";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../features/dashboard/Dashboard";
import Friends from "../features/friends/Friends";
const AppRoutes = () => {
  const location = useLocation();
  const isExcludedRouteForNavBar = !["/"].some(
    (route) => location.pathname === route
  );
  return (
    <>
      <div>
        <React.Suspense fallback={<LoadingComponent open={true} />}>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <div style={{ flexGrow: 1 }}>
              {isExcludedRouteForNavBar && <SideBar />}
              {isExcludedRouteForNavBar && <Navbar />}
              <Routes>
                <Route path="/" element={<SignUpSignIn />} />
                <Route
                  path="/dashboard"
                  element={<PrivateRoute element={<Dashboard />} />}
                />
                <Route
                  path="/group"
                  element={<PrivateRoute element={<GroupComponent />} />}
                />
                <Route
                  path="/friends"
                  element={<PrivateRoute element={<Friends />} />}
                />
              </Routes>
            </div>
          </Box>
        </React.Suspense>
        <ToastContainer
          position="top-right"
          autoClose={1800}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={2}
          theme="light"
        />
      </div>
    </>
  );
};

export default AppRoutes;
