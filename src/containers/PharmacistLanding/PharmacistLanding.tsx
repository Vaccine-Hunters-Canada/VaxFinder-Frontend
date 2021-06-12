import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Card } from "@shopify/polaris";

export function PharmacistLanding() {
  const history = useHistory();
  const { search } = useLocation();

  return (
    <>
      <Card>
        <Card.Section>
          <p>Remove appointments</p>

          <Button
            primary
            onClick={() => history.push(`/admin/removeAppointments${search}`)}
          >
            Go to remove appointment screen
          </Button>
        </Card.Section>
      </Card>
      <Card>
        <Card.Section>
          <p>Add appointments</p>

          <Button
            primary
            onClick={() => history.push(`/admin/rapidAppointment${search}`)}
          >
            Go to add appointment screen
          </Button>
        </Card.Section>
      </Card>
    </>
  );
}
