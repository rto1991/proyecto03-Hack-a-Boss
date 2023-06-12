import { useUser } from "../UserContext";
import { useUserActions } from "../hooks/api";

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

function Dashboard() {
  const [user] = useUser();
  const { logout } = useUserActions();

  if (!user || user.status == "error") {
    return <Navigate to="/" />;
  }

  return <></>;
}

export default Dashboard;
