import {
  Banner,
  Button,
  Card,
  Form,
  FormLayout,
  TextField,
  TextStyle,
} from "@shopify/polaris";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import { useLoginApiV1SecurityLoginPost } from "../../apiClient";
import { AppContext } from "../../contexts/AppContext";
import { userService } from "../../services/userService";

export function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [pharmacyPassword, setPharmacyPassword] = useState("");
  const [didStaffLoginSucceed, setDidStaffLoginSucceed] = useState(false);
  const [didPharmacyLoginSucceed, setDidPharmacyLoginSucceed] = useState(false);
  const [isStaffInvalidCredentials, setIsStaffInvalidCredentials] = useState(
    false,
  );
  const [
    isPharmacyInvalidCredentials,
    setIsPharmacyInvalidCredentials,
  ] = useState(false);

  const { t } = useTranslation();
  const { setState } = useContext(AppContext);

  const { mutate: post, loading, error } = useLoginApiV1SecurityLoginPost({});

  const handleStaffSubmit = () => {
    post({ name, password })
      .then((user) => {
        if (user.key) {
          userService.setUser(user);
          setState({ user });
          setDidStaffLoginSucceed(true);
        } else {
          setIsStaffInvalidCredentials(true);
        }
      })
      .catch((err) => console.error(err));
  };

  const handlePharmacistSubmit = () => {
    post({ name: "PharmacyUser", password: pharmacyPassword })
      .then((user) => {
        if (user.key) {
          userService.setUser(user);
          setState({ user });
          setDidPharmacyLoginSucceed(true);
        } else {
          setIsPharmacyInvalidCredentials(true);
        }
      })
      .catch((err) => console.error(err));
  };

  if (didStaffLoginSucceed) {
    return <Redirect to="/admin/popup" />;
  }

  if (didPharmacyLoginSucceed) {
    return <Redirect to="/admin/externalKey" />;
  }

  return (
    <>
      <Card>
        <Card.Section>
          <TextStyle variation="strong">Pharmacy Staff Login</TextStyle>
        </Card.Section>
        <Card.Section>
          {error ? (
            <Banner status="critical">{t("anerrorhasoccurred")}</Banner>
          ) : undefined}

          {isPharmacyInvalidCredentials ? (
            <Banner status="critical">{t("invalidcredentials")}</Banner>
          ) : undefined}
          <Form onSubmit={handlePharmacistSubmit}>
            <FormLayout>
              <TextField
                type="password"
                value={pharmacyPassword}
                onChange={setPharmacyPassword}
                placeholder={t("enterpassword")}
                label={t("password")}
                autoComplete="false"
              />
              <Button primary submit disabled={loading || !pharmacyPassword}>
                {t("login")}
              </Button>
            </FormLayout>
          </Form>
        </Card.Section>
      </Card>
      <Card>
        <Card.Section>
          <TextStyle variation="strong">
            Vaccine Hunters Canada Staff Login
          </TextStyle>
        </Card.Section>
        <Card.Section>
          {isStaffInvalidCredentials ? (
            <Banner status="critical">{t("invalidcredentials")}</Banner>
          ) : undefined}
          <Form onSubmit={handleStaffSubmit}>
            <FormLayout>
              <TextField
                type="text"
                value={name}
                onChange={setName}
                placeholder={t("enterusername")}
                label={t("username")}
                autoComplete="false"
              />
              <TextField
                type="password"
                value={password}
                onChange={setPassword}
                placeholder={t("enterpassword")}
                label={t("password")}
                autoComplete="false"
              />
              <Button primary submit disabled={loading || !name || !password}>
                {t("login")}
              </Button>
            </FormLayout>
          </Form>
        </Card.Section>
      </Card>
    </>
  );
}
