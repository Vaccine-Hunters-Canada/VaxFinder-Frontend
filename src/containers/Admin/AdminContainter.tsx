import React, { useState } from "react";
import { authAccessToken } from "../../utils/auth";
import { AdminLogin } from "../../components/Admin/AdminLogin/AdminLogin";
import { AdminPopUpClinic } from "../../components/Admin/AddPopUpClinic/AdminPopUpClinic";

export function AdminContainer() {
  const [accessToken, setAccessToken] = useState(
    window.sessionStorage.getItem("bearerToken") || null,
  );

  if (accessToken && !authAccessToken(accessToken)) {
    window.sessionStorage.removeItem("bearerToken");
    setAccessToken(null);
  }

  if (!accessToken) {
    return <AdminLogin setAccessSessionStateToken={setAccessToken} />;
  }

  return <AdminPopUpClinic />;
}
