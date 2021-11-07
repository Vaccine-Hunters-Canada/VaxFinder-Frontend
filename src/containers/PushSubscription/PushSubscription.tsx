import {
  Banner,
  Button,
  Card,
  Form,
  FormLayout,
  TextField,
} from "@shopify/polaris";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import {
  useRetrievePublicKeyApiV1WebPushPublicKeyGet,
  useCreateSubscriptionApiV1WebPushSubscriptionPost,
  useDeleteSubscriptionByEndpointApiV1WebPushSubscriptionEndpointDelete,
} from "../../apiClient";
import { serviceWorkerRegistrar } from "../../serviceWorkerRegistration";
import { postalCodeIsValid, checkIsWebPushSupported } from "../../utils";

// This function is needed because Chrome doesn't accept a base64 encoded string
// as value for applicationServerKey in pushManager.subscribe yet
// https://bugs.chromium.org/p/chromium/issues/detail?id=802280
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    // eslint-disable-next-line no-useless-escape
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function PushSubscription() {
  const { t } = useTranslation();
  const [postalCode, setPostalCode] = useState("");
  const [
    shouldShowInvalidPostalCode,
    setShouldShowInvalidPostalCode,
  ] = useState(false);
  const [isError, setIsError] = useState(false);
  // Typing to null instead of the usual undefined per the sw api
  const registrationRef = useRef<ServiceWorkerRegistration | null>(null);
  const subscriptionRef = useRef<PushSubscription | null>(null);
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    async function checkSubscription() {
      const foundRegistration = await serviceWorkerRegistrar.register();
      const foundSubscription = await foundRegistration.pushManager.getSubscription();

      registrationRef.current = foundRegistration;
      subscriptionRef.current = foundSubscription;
      if (!foundSubscription) {
        setIsSubscribing(true);
      }
    }

    checkSubscription().catch((err) => console.error(err));
  }, []);

  const {
    loading: publicKeyLoading,
    data: publicKeyData,
    error: publicKeyError,
  } = useRetrievePublicKeyApiV1WebPushPublicKeyGet({});

  const {
    loading: subscriptionLoading,
    error: subscriptionError,
    mutate: postSubscription,
  } = useCreateSubscriptionApiV1WebPushSubscriptionPost({});

  const {
    mutate: deleteSubscription,
  } = useDeleteSubscriptionByEndpointApiV1WebPushSubscriptionEndpointDelete({});

  // If browser doesn't support notification and push, bounce user to root
  if (!checkIsWebPushSupported()) {
    return <Redirect to="/" />;
  }

  if (publicKeyLoading || !publicKeyData?.key) {
    return <></>;
  }

  if (publicKeyError || subscriptionError || isError) {
    return (
      <Banner title="Error" status="critical">
        {t("anerrorhasoccurred")}
      </Banner>
    );
  }

  const validateForm = () => {
    let isValid = true;

    if (!postalCodeIsValid(postalCode)) {
      setShouldShowInvalidPostalCode(true);
      isValid = false;
    } else {
      setShouldShowInvalidPostalCode(false);
    }

    return isValid;
  };

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!validateForm()) {
      return;
    }

    const convertedVapidKey = urlBase64ToUint8Array(publicKeyData.key);
    const sub = await registrationRef.current!.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    });
    subscriptionRef.current = sub;

    const auth = sub.toJSON().keys?.auth;
    const p256dh = sub.toJSON().keys?.p256dh;

    if (!auth || !p256dh) {
      setIsError(true);
      return;
    }

    postSubscription({
      endpoint: sub.endpoint,
      auth,
      p256dh,
      postalCode,
    })
      .then(() => setIsSubscribing(false))
      .catch((err) => console.error(err));
  };

  const handleUnsubscribe = () => {
    const { endpoint } = subscriptionRef.current!;
    deleteSubscription(endpoint).catch((err) => console.error(err));

    subscriptionRef
      .current!.unsubscribe()
      .then(() => setIsSubscribing(true))
      .catch((err) => console.error(err));
  };

  // I can't inline the call to t() below as it results in:
  // Type 'TFunctionResult' is not assignable to type 'boolean | Error | undefined
  const invaldPostalMessage = t("invalidpostal");

  // Show subscription form or unsubscription form
  return isSubscribing ? (
    <Card>
      <Banner title="Subscribe for push notifications" status="info">
        Sign up to be notified when vaccines become available in your area.
      </Banner>
      <Card.Section>
        <Form onSubmit={handleSubscribe}>
          <FormLayout>
            <FormLayout.Group>
              <TextField
                value={postalCode}
                onChange={setPostalCode}
                label={t("enterpostalcode")}
                helpText={<span>{t("postalcodetext")}</span>}
                error={
                  shouldShowInvalidPostalCode ? invaldPostalMessage : undefined
                }
                type="text"
              />
            </FormLayout.Group>
            <Button primary submit disabled={subscriptionLoading}>
              Subscribe
            </Button>
          </FormLayout>
        </Form>
      </Card.Section>
    </Card>
  ) : (
    <Card>
      <Banner title="Unsubscribe from push notifications" status="info">
        You are presently subscribed to push notifications. Click the button
        below to stop receiving messages.
      </Banner>
      <Card.Section>
        <Form onSubmit={handleUnsubscribe}>
          <FormLayout>
            <Button primary submit disabled={subscriptionLoading}>
              Unsubscribe
            </Button>
          </FormLayout>
        </Form>
      </Card.Section>
    </Card>
  );
}
