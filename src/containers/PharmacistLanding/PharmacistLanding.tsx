import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Banner, Button, Card } from "@shopify/polaris";
import queryString from "query-string";

export function PharmacistLanding() {
  const history = useHistory();
  const { search } = useLocation();
  const params = queryString.parse(search);

  return (
    <>
      {params.saveSuccess === "true" ? (
        <Card>
          <Card.Section>
            <Banner title="Success" status="success">
              Update succeeded
            </Banner>
          </Card.Section>
        </Card>
      ) : undefined}

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
