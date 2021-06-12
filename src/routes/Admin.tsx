import React from "react";
import { Route } from "react-router-dom";
import { PopUpForm } from "../components/PopUpForm";
import { ExternalKeyInput } from "../containers/ExternalKeyInput";
import { PharmacistLanding } from "../containers/PharmacistLanding";
import { RapidAppointment } from "../containers/RapidAppointment";
import { RemoveAppointments } from "../containers/RemoveAppointments";

// eslint-disable-next-line import/no-default-export
export default function AdminRoutes() {
  return (
    <>
      <Route exact path="/admin/popup" render={() => <PopUpForm />} />
      <Route
        exact
        path="/admin/externalKey"
        render={() => <ExternalKeyInput />}
      />
      <Route
        exact
        path="/admin/rapidAppointment"
        render={() => <RapidAppointment />}
      />
      <Route
        exact
        path="/admin/removeAppointments"
        render={() => <RemoveAppointments />}
      />
      <Route
        exact
        path="/admin/pharmacistLanding"
        render={() => <PharmacistLanding />}
      />
    </>
  );
}
