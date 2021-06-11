import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import React from "react";
import { server } from "../../mocks/server";
import { render, screen } from "../../testUtils";
import { PopUpForm } from "./PopUpForm";

describe("Popup form", () => {
  test("Form should show validation errors if required form values are empty", () => {
    render(<PopUpForm />);
    const button = screen.getByRole("button", {
      name: /submit/i,
    });
    userEvent.click(button);
    expect(screen.getByText(/name must not be empty/i)).toBeInTheDocument();
    expect(screen.getByText(/Date is empty/gi)).toBeInTheDocument();
    expect(screen.getByText(/address must not be empty/i)).toBeInTheDocument();
    expect(screen.getByText(/city must not be empty/i)).toBeInTheDocument();
    expect(screen.getByText(/province must not be empty/i)).toBeInTheDocument();
    expect(screen.getByText(/invalid postal code/i)).toBeInTheDocument();
    expect(screen.getByText(/url must not be empty/i)).toBeInTheDocument();
  });

  test("Form should show validation errors if form values are invalid", () => {
    render(<PopUpForm />);
    userEvent.type(
      screen.getByRole("textbox", { name: /enter postal code/i }),
      "INVALID POSTAL CODE",
    );
    const button = screen.getByRole("button", {
      name: /submit/i,
    });
    userEvent.click(button);
    expect(screen.getByText(/invalid postal code/i)).toBeInTheDocument();
  });

  const fillOutForm = () => {
    render(<PopUpForm />);
    userEvent.type(
      screen.getByRole("textbox", { name: /enter clinic name/i }),
      "My clinic",
    );
    userEvent.type(screen.getByLabelText(/enter date/i), "2021-06-21");
    userEvent.type(
      screen.getByRole("textbox", { name: /enter address/i }),
      "1 Main Street",
    );
    userEvent.type(
      screen.getByRole("textbox", { name: /enter city/i }),
      "Ottawa",
    );
    userEvent.type(
      screen.getByRole("textbox", { name: /enter province/i }),
      "ON",
    );
    userEvent.type(
      screen.getByRole("textbox", { name: /enter postal code/i }),
      "K1R1R4",
    );
    userEvent.type(
      screen.getByRole("textbox", { name: /enter website url/i }),
      "www.someurl.com",
    );

    userEvent.click(screen.getByText(/1st dose/i));

    userEvent.click(screen.getByText(/call ahead/i));
  };

  test("Form should show general error if api request fails", async () => {
    server.use(
      rest.post(
        `${process.env
          .REACT_APP_API_URL!}/api/v1/vaccine-availability/locations/key/:external_key`,
        (req, res, ctx) => res(ctx.status(500)),
      ),
    );
    fillOutForm();

    const button = screen.getByRole("button", {
      name: /submit/i,
    });
    userEvent.click(button);

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument();
  });

  test("Form should show success message when popup is saved", async () => {
    fillOutForm();

    const button = screen.getByRole("button", {
      name: /submit/i,
    });
    userEvent.click(button);

    expect(
      await screen.findByText(/your popup has been saved/i),
    ).toBeInTheDocument();
  });
});
