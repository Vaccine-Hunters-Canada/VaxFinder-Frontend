import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Card, Modal, TextContainer } from "@shopify/polaris";
import queryString from "query-string";

export function PharmacistLanding() {
  const history = useHistory();
  const { search } = useLocation();
  const params = queryString.parse(search);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(params.saveSuccess === "true");
  }, [params.saveSuccess]);

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

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Success"
        primaryAction={{
          content: "Ok",
          onAction: () => setIsModalOpen(false),
        }}
      >
        <Modal.Section>
          <TextContainer>
            <p>Your update has successfully been applied.</p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </>
  );
}
