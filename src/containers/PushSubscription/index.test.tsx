import * as React from "react";
import { render, screen } from "../../testUtils";
import { PushSubscription } from "./PushSubscription";
import { serviceWorkerRegistrar } from "../../serviceWorkerRegistration";
import userEvent from "@testing-library/user-event";

jest.mock("../../serviceWorkerRegistration");

describe("PushSubscription", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (global as any).PushManager = {} as PushManager;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (global as any).Notification = {} as Notification;
  });

  test("Should show subscription form if there is no active subscription", async () => {
    // Return a falsy val for the sub so subscription form will render
    const mockRegistration = {
      pushManager: {
        getSubscription: () => null,
      },
    };
    serviceWorkerRegistrar.register = jest.fn(() =>
      Promise.resolve(
        (mockRegistration as unknown) as ServiceWorkerRegistration,
      ),
    );
    render(<PushSubscription />);

    const title = await screen.findByText(/subscribe for push notifications/i);
    expect(title).toBeInTheDocument();
  });

  test("Should show unsubscription form if there is an active subscription", async () => {
    // Return a truthy val for the sub so unsubscription form will render
    const mockRegistration = {
      pushManager: {
        getSubscription: () => ({}),
      },
    };
    serviceWorkerRegistrar.register = jest.fn(() =>
      Promise.resolve(mockRegistration as ServiceWorkerRegistration),
    );
    render(<PushSubscription />);

    const title = await screen.findByText(
      /Unsubscribe from push notifications/i,
    );
    expect(title).toBeInTheDocument();
  });

  test("Should show error if there is invalid postal code is submitted", async () => {
    // Return a falsy val for the sub so subscription form will render
    const mockRegistration = {
      pushManager: {
        getSubscription: () => null,
      },
    };
    serviceWorkerRegistrar.register = jest.fn(() =>
      Promise.resolve(
        (mockRegistration as unknown) as ServiceWorkerRegistration,
      ),
    );
    render(<PushSubscription />);

    const textbox = await screen.findByRole("textbox", {
      name: /please enter your postal code \(example: k2t 0e5\):/i,
    });
    userEvent.type(textbox, "foo");

    const button = screen.getByRole("button", {
      name: /subscribe/i,
    });
    userEvent.click(button);
    expect(
      screen.getByText(/you have entered an invalid postal code/i),
    ).toBeInTheDocument();
  });

  test("Upon successful subscription, show unsubscription form", async () => {
    // Return a falsy val for the sub so subscription form will render
    const mockRegistration = {
      pushManager: {
        getSubscription: () => null,
        subscribe: () => ({
          endpoint: "i am an endpoint",
          toJSON: () => ({
            keys: {
              auth: "12345",
              p256dh: "abcde",
            },
          }),
        }),
      },
    };
    serviceWorkerRegistrar.register = jest.fn(() =>
      Promise.resolve(
        (mockRegistration as unknown) as ServiceWorkerRegistration,
      ),
    );
    render(<PushSubscription />);

    const textbox = await screen.findByRole("textbox", {
      name: /please enter your postal code \(example: k2t 0e5\):/i,
    });
    userEvent.type(textbox, "k2t 0e5");

    const button = screen.getByRole("button", {
      name: /subscribe/i,
    });
    userEvent.click(button);

    const title = await screen.findByText(
      /Unsubscribe from push notifications/i,
    );
    expect(title).toBeInTheDocument();
  });

  test("Upon successful unsubscription, show submission form", async () => {
    // Return a truthy val for the sub so unsubscription form will render
    const mockRegistration = {
      pushManager: {
        getSubscription: () => ({
          unsubscribe: () => Promise.resolve(),
        }),
      },
    };
    serviceWorkerRegistrar.register = jest.fn(() =>
      Promise.resolve(
        (mockRegistration as unknown) as ServiceWorkerRegistration,
      ),
    );
    render(<PushSubscription />);

    const button = await screen.findByRole("button", {
      name: /unsubscribe/i,
    });
    userEvent.click(button);

    const title = await screen.findByText(/subscribe for push notifications/i);
    expect(title).toBeInTheDocument();
  });
});
