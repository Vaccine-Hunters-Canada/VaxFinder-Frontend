import {
  Banner,
  Button,
  Card,
  Form,
  FormLayout,
  TextField,
} from "@shopify/polaris";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import { useLoginApiV1SecurityLoginPost } from "../../apiClient";

export function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [didLoginSucceed, setDidLoginSucceed] = useState(false);

  const { t } = useTranslation();

  const { mutate: post, loading, error } = useLoginApiV1SecurityLoginPost({});

  const handleSubmit = () => {
    post({ name, password })
      .then(() => {
        setDidLoginSucceed(true);
      })
      .catch((err) => console.error(err));
  };

  if (didLoginSucceed) {
    return <Redirect to="/" />;
  }

  return (
    <Card>
      <Card.Section>
        {error ? (
          <Banner status="critical">{t("anerrorhasoccurred")}</Banner>
        ) : undefined}
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              type="text"
              value={name}
              onChange={setName}
              placeholder={t("enterusername")}
              label={t("username")}
              error=""
            />
            <TextField
              type="password"
              value={password}
              onChange={setPassword}
              placeholder={t("enterpassword")}
              label={t("password")}
              error=""
            />
            <Button primary submit disabled={loading}>
              {t("login")}
            </Button>
          </FormLayout>
        </Form>
      </Card.Section>
    </Card>
  );
}
