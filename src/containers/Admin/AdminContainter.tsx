import React, { useState } from "react";
import { getAuthAccessToken } from "../../utils/auth";
import { AdminLogin } from "../../components/Admin/AdminLogin/AdminLogin";
import { AdminPopUpClinic } from "../../components/Admin/AddPopUpClinic/AdminPopUpClinic";
import { usePrevious } from "../../hooks/usePrevious";

export function AdminContainer() {
  const [accessToken, setAccessToken] = useState(
    window.sessionStorage.getItem("bearerToken") || null,
  );

  const previousAccessToken = usePrevious(accessToken);

  if (
    accessToken &&
    previousAccessToken !== accessToken &&
    !getAuthAccessToken(accessToken)
  ) {
    window.sessionStorage.removeItem("bearerToken");
    setAccessToken(null);
    return <></>;
  }

  if (!accessToken) {
    return <AdminLogin setAccessSessionStateToken={setAccessToken} />;
  }

  return <AdminPopUpClinic />;
}
