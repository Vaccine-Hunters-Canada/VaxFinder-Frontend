import React, { useState } from "react";
import { Card, Form, FormLayout, TextField } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { postalCodeIsValid } from "../../../utils/postalCode";
import { phoneNumberIsValid } from "../../../utils/phoneNumber";

export interface IPopUpClinic {
  name: string;
  date: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  websiteUrl: string;
}

const handleSubmit = () => {
  return true;
};

export function AdminPopUpClinic() {
  const { t } = useTranslation();

  const [popUpClinic, setPopUpClinc] = useState<IPopUpClinic>({
    name: "",
    date: new Date().toDateString(),
    street: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
    websiteUrl: "",
  });

  const validate = (field: keyof IPopUpClinic, value: string) => {
    if (field === "postalCode" && !postalCodeIsValid(value)) {
      return t("invalidpostalcode");
    }

    if (field === "phone" && !phoneNumberIsValid(value)) {
      return t("invalidphonenumber");
    }

    return "";
  };

  const onFormChanged = (field: keyof IPopUpClinic, value: string) => {
    if (popUpClinic[field] !== undefined) {
      setPopUpClinc({ ...popUpClinic, [field]: value });
    }
  };

  return (
    <Card>
      <Card.Section>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <FormLayout.Group>
              <TextField
                name="name"
                type="text"
                value={popUpClinic.name}
                label={t("clinicname")}
                onChange={(value) => onFormChanged("name", value)}
              />
              <TextField
                name="date"
                type="date"
                value={popUpClinic.date}
                label={t("date")}
                onChange={(value) => onFormChanged("date", value)}
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField
                name="streetname"
                type="text"
                value={popUpClinic.street}
                label={t("streetname")}
                onChange={(value) => onFormChanged("street", value)}
              />
              <TextField
                name="city"
                type="text"
                value={popUpClinic.city}
                label={t("city")}
                onChange={(value) => onFormChanged("city", value)}
              />
              <TextField
                name="province"
                type="text"
                value={popUpClinic.province}
                label={t("province")}
                onChange={(value) => onFormChanged("province", value)}
              />
              <TextField
                name="postalcode"
                type="text"
                error={validate("postalCode", popUpClinic.postalCode)}
                value={popUpClinic.postalCode}
                label={t("postalcode")}
                onChange={(value) => onFormChanged("postalCode", value)}
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField
                name="phone"
                type="tel"
                error={validate("phone", popUpClinic.phone)}
                value={popUpClinic.phone}
                label={t("phone")}
                onChange={(value) => onFormChanged("phone", value)}
              />
              <TextField
                name="websiteurl"
                type="url"
                value={popUpClinic.websiteUrl}
                label={t("websiteurl")}
                onChange={(value) => onFormChanged("websiteUrl", value)}
              />
            </FormLayout.Group>
          </FormLayout>
        </Form>
      </Card.Section>
    </Card>
  );
}
