import { Form, FormLayout, TextField, Button, Card } from "@shopify/polaris";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { getAuthAccessToken } from "../../../utils/auth";

export interface IAdminLoginProps {
  setAccessSessionStateToken: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

export function AdminLogin({ setAccessSessionStateToken }: IAdminLoginProps) {
  const { t } = useTranslation();
  const [
    shouldShowInvalidAccessToken,
    setShouldShowInvalidAccessToken,
  ] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const handleSubmit = () => {
    const bearerToken = getAuthAccessToken(accessToken);
    if (bearerToken) {
      window.sessionStorage.setItem("bearerToken", bearerToken);
      setAccessSessionStateToken(bearerToken);
    } else {
      setShouldShowInvalidAccessToken(true);
    }
  };

  const invalidAccessToken = shouldShowInvalidAccessToken
    ? t("invalidaccesstoken")
    : undefined;

  return (
    <>
      <Card>
        <Card.Section>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                type="password"
                value={accessToken}
                onChange={setAccessToken}
                placeholder={t("enterpassword")}
                label={t("logintoadminportal")}
                error={invalidAccessToken}
              />
              <Button primary submit>
                {t("login")}
              </Button>
            </FormLayout>
          </Form>
        </Card.Section>
      </Card>
    </>
  );
}
