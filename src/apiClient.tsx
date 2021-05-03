/* Generated by restful-react */

import React from "react";
import {
  Get,
  GetProps,
  useGet,
  UseGetProps,
  Mutate,
  MutateProps,
  useMutate,
  UseMutateProps,
} from "restful-react";

export const SPEC_VERSION = "1.0.0";
export interface AddressResponse {
  id: number;
  line1?: string;
  line2?: string;
  city?: string;
  province: string;
  postcode: string;
  created_at: string;
}

export interface GeneralResponse {
  success: boolean;
  data?: string;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}

/**
 * An enumeration.
 */
export type InputTypeEnum = number;

export interface LocationExpandedResponse {
  id: number;
  name: string;
  phone?: string;
  notes?: string;
  active: number;
  postcode?: string;
  url?: string;
  tags?: string;
  created_at: string;
  organization?: number;
  address?: AddressResponse;
}

export interface OrganizationCreateRequest {
  full_name?: string;
  short_name: string;
  description?: string;
  url?: string;
}

export interface OrganizationResponse {
  id: number;
  full_name?: string;
  short_name: string;
  description?: string;
  url?: string;
  created_at: string;
}

export interface RequirementResponse {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface VaccineAvailabilityExpandedResponse {
  id: string;
  numberAvailable: number;
  numberTotal?: number;
  date: string;
  vaccine?: number;
  inputType: InputTypeEnum;
  tags?: string;
  created_at: string;
  location: LocationExpandedResponse;
}

export interface ValidationError {
  loc: string[];
  msg: string;
  type: string;
}

export interface ListVaccineAvailabilityApiV1VaccineAvailabilityGetQueryParams {
  postalCode?: string;
}

export type ListVaccineAvailabilityApiV1VaccineAvailabilityGetProps = Omit<
  GetProps<
    VaccineAvailabilityExpandedResponse[],
    HTTPValidationError,
    ListVaccineAvailabilityApiV1VaccineAvailabilityGetQueryParams,
    void
  >,
  "path"
>;

/**
 * List Vaccine Availability
 */
export const ListVaccineAvailabilityApiV1VaccineAvailabilityGet = (
  props: ListVaccineAvailabilityApiV1VaccineAvailabilityGetProps,
) => (
  <Get<
    VaccineAvailabilityExpandedResponse[],
    HTTPValidationError,
    ListVaccineAvailabilityApiV1VaccineAvailabilityGetQueryParams,
    void
  >
    path="/api/v1/vaccine-availability"
    {...props}
  />
);

export type UseListVaccineAvailabilityApiV1VaccineAvailabilityGetProps = Omit<
  UseGetProps<
    VaccineAvailabilityExpandedResponse[],
    HTTPValidationError,
    ListVaccineAvailabilityApiV1VaccineAvailabilityGetQueryParams,
    void
  >,
  "path"
>;

/**
 * List Vaccine Availability
 */
export const useListVaccineAvailabilityApiV1VaccineAvailabilityGet = (
  props: UseListVaccineAvailabilityApiV1VaccineAvailabilityGetProps,
) =>
  useGet<
    VaccineAvailabilityExpandedResponse[],
    HTTPValidationError,
    ListVaccineAvailabilityApiV1VaccineAvailabilityGetQueryParams,
    void
  >("/api/v1/vaccine-availability");

export interface RetrieveVaccineAvailabilityByIdApiV1VaccineAvailabilityEntryIdGetPathParams {
  entry_id: number;
}

export type RetrieveVaccineAvailabilityByIdApiV1VaccineAvailabilityEntryIdGetProps = Omit<
  GetProps<
    VaccineAvailabilityExpandedResponse,
    void | HTTPValidationError,
    void,
    RetrieveVaccineAvailabilityByIdApiV1VaccineAvailabilityEntryIdGetPathParams
  >,
  "path"
> &
  RetrieveVaccineAvailabilityByIdApiV1VaccineAvailabilityEntryIdGetPathParams;

/**
 * Retrieve Vaccine Availability By Id
 */
export const RetrieveVaccineAvailabilityByIdApiV1VaccineAvailabilityEntryIdGet = ({
  entry_id,
  ...props
}: RetrieveVaccineAvailabilityByIdApiV1VaccineAvailabilityEntryIdGetProps) => (
  <Get<
    VaccineAvailabilityExpandedResponse,
    void | HTTPValidationError,
    void,
    RetrieveVaccineAvailabilityByIdApiV1VaccineAvailabilityEntryIdGetPathParams
  >
    path={`/api/v1/vaccine-availability/${entry_id}`}
    {...props}
  />
);

export type UseRetrieveVaccineAvailabilityByIdApiV1VaccineAvailabilityEntryIdGetProps = Omit<
  UseGetProps<
    VaccineAvailabilityExpandedResponse,
    void | HTTPValidationError,
    void,
    RetrieveVaccineAvailabilityByIdApiV1VaccineAvailabilityEntryIdGetPathParams
  >,
  "path"
> &
  RetrieveVaccineAvailabilityByIdApiV1VaccineAvailabilityEntryIdGetPathParams;

/**
 * Retrieve Vaccine Availability By Id
 */
export const useRetrieveVaccineAvailabilityByIdApiV1VaccineAvailabilityEntryIdGet = ({
  entry_id,
  ...props
}: UseRetrieveVaccineAvailabilityByIdApiV1VaccineAvailabilityEntryIdGetProps) =>
  useGet<
    VaccineAvailabilityExpandedResponse,
    void | HTTPValidationError,
    void,
    RetrieveVaccineAvailabilityByIdApiV1VaccineAvailabilityEntryIdGetPathParams
  >(
    (
      paramsInPath: RetrieveVaccineAvailabilityByIdApiV1VaccineAvailabilityEntryIdGetPathParams,
    ) => `/api/v1/vaccine-availability/${paramsInPath.entry_id}`,
    { pathParams: { entry_id }, ...props },
  );

export interface ListLocationsApiV1LocationsGetQueryParams {
  postalCode?: string;
}

export type ListLocationsApiV1LocationsGetProps = Omit<
  GetProps<
    LocationExpandedResponse[],
    HTTPValidationError,
    ListLocationsApiV1LocationsGetQueryParams,
    void
  >,
  "path"
>;

/**
 * List Locations
 */
export const ListLocationsApiV1LocationsGet = (
  props: ListLocationsApiV1LocationsGetProps,
) => (
  <Get<
    LocationExpandedResponse[],
    HTTPValidationError,
    ListLocationsApiV1LocationsGetQueryParams,
    void
  >
    path="/api/v1/locations"
    {...props}
  />
);

export type UseListLocationsApiV1LocationsGetProps = Omit<
  UseGetProps<
    LocationExpandedResponse[],
    HTTPValidationError,
    ListLocationsApiV1LocationsGetQueryParams,
    void
  >,
  "path"
>;

/**
 * List Locations
 */
export const useListLocationsApiV1LocationsGet = (
  props: UseListLocationsApiV1LocationsGetProps,
) =>
  useGet<
    LocationExpandedResponse[],
    HTTPValidationError,
    ListLocationsApiV1LocationsGetQueryParams,
    void
  >("/api/v1/locations", props);

export interface RetrieveLocationByIdApiV1LocationsLocationIdGetPathParams {
  location_id: number;
}

export type RetrieveLocationByIdApiV1LocationsLocationIdGetProps = Omit<
  GetProps<
    LocationExpandedResponse,
    void | HTTPValidationError,
    void,
    RetrieveLocationByIdApiV1LocationsLocationIdGetPathParams
  >,
  "path"
> &
  RetrieveLocationByIdApiV1LocationsLocationIdGetPathParams;

/**
 * Retrieve Location By Id
 */
export const RetrieveLocationByIdApiV1LocationsLocationIdGet = ({
  location_id,
  ...props
}: RetrieveLocationByIdApiV1LocationsLocationIdGetProps) => (
  <Get<
    LocationExpandedResponse,
    void | HTTPValidationError,
    void,
    RetrieveLocationByIdApiV1LocationsLocationIdGetPathParams
  >
    path={`/api/v1/locations/${location_id}`}
    {...props}
  />
);

export type UseRetrieveLocationByIdApiV1LocationsLocationIdGetProps = Omit<
  UseGetProps<
    LocationExpandedResponse,
    void | HTTPValidationError,
    void,
    RetrieveLocationByIdApiV1LocationsLocationIdGetPathParams
  >,
  "path"
> &
  RetrieveLocationByIdApiV1LocationsLocationIdGetPathParams;

/**
 * Retrieve Location By Id
 */
export const useRetrieveLocationByIdApiV1LocationsLocationIdGet = ({
  location_id,
  ...props
}: UseRetrieveLocationByIdApiV1LocationsLocationIdGetProps) =>
  useGet<
    LocationExpandedResponse,
    void | HTTPValidationError,
    void,
    RetrieveLocationByIdApiV1LocationsLocationIdGetPathParams
  >(
    (paramsInPath: RetrieveLocationByIdApiV1LocationsLocationIdGetPathParams) =>
      `/api/v1/locations/${paramsInPath.location_id}`,
    { pathParams: { location_id }, ...props },
  );

export interface ListOrganizationsApiV1OrganizationsGetQueryParams {
  name?: string;
}

export type ListOrganizationsApiV1OrganizationsGetProps = Omit<
  GetProps<
    OrganizationResponse[],
    HTTPValidationError,
    ListOrganizationsApiV1OrganizationsGetQueryParams,
    void
  >,
  "path"
>;

/**
 * List Organizations
 */
export const ListOrganizationsApiV1OrganizationsGet = (
  props: ListOrganizationsApiV1OrganizationsGetProps,
) => (
  <Get<
    OrganizationResponse[],
    HTTPValidationError,
    ListOrganizationsApiV1OrganizationsGetQueryParams,
    void
  >
    path="/api/v1/organizations"
    {...props}
  />
);

export type UseListOrganizationsApiV1OrganizationsGetProps = Omit<
  UseGetProps<
    OrganizationResponse[],
    HTTPValidationError,
    ListOrganizationsApiV1OrganizationsGetQueryParams,
    void
  >,
  "path"
>;

/**
 * List Organizations
 */
export const useListOrganizationsApiV1OrganizationsGet = (
  props: UseListOrganizationsApiV1OrganizationsGetProps,
) =>
  useGet<
    OrganizationResponse[],
    HTTPValidationError,
    ListOrganizationsApiV1OrganizationsGetQueryParams,
    void
  >("/api/v1/organizations", props);

export type CreateOrganizationApiV1OrganizationsPostProps = Omit<
  MutateProps<
    GeneralResponse,
    HTTPValidationError,
    void,
    OrganizationCreateRequest,
    void
  >,
  "path" | "verb"
>;

/**
 * Create Organization
 */
export const CreateOrganizationApiV1OrganizationsPost = (
  props: CreateOrganizationApiV1OrganizationsPostProps,
) => (
  <Mutate<
    GeneralResponse,
    HTTPValidationError,
    void,
    OrganizationCreateRequest,
    void
  >
    verb="POST"
    path="/api/v1/organizations"
    {...props}
  />
);

export type UseCreateOrganizationApiV1OrganizationsPostProps = Omit<
  UseMutateProps<
    GeneralResponse,
    HTTPValidationError,
    void,
    OrganizationCreateRequest,
    void
  >,
  "path" | "verb"
>;

/**
 * Create Organization
 */
export const useCreateOrganizationApiV1OrganizationsPost = (
  props: UseCreateOrganizationApiV1OrganizationsPostProps,
) =>
  useMutate<
    GeneralResponse,
    HTTPValidationError,
    void,
    OrganizationCreateRequest,
    void
  >("POST", "/api/v1/organizations", props);

export interface RetrieveOrganizationByIdApiV1OrganizationsOrganizationIdGetPathParams {
  organization_id: number;
}

export type RetrieveOrganizationByIdApiV1OrganizationsOrganizationIdGetProps = Omit<
  GetProps<
    OrganizationResponse,
    void | HTTPValidationError,
    void,
    RetrieveOrganizationByIdApiV1OrganizationsOrganizationIdGetPathParams
  >,
  "path"
> &
  RetrieveOrganizationByIdApiV1OrganizationsOrganizationIdGetPathParams;

/**
 * Retrieve Organization By Id
 */
export const RetrieveOrganizationByIdApiV1OrganizationsOrganizationIdGet = ({
  organization_id,
  ...props
}: RetrieveOrganizationByIdApiV1OrganizationsOrganizationIdGetProps) => (
  <Get<
    OrganizationResponse,
    void | HTTPValidationError,
    void,
    RetrieveOrganizationByIdApiV1OrganizationsOrganizationIdGetPathParams
  >
    path={`/api/v1/organizations/${organization_id}`}
    {...props}
  />
);

export type UseRetrieveOrganizationByIdApiV1OrganizationsOrganizationIdGetProps = Omit<
  UseGetProps<
    OrganizationResponse,
    void | HTTPValidationError,
    void,
    RetrieveOrganizationByIdApiV1OrganizationsOrganizationIdGetPathParams
  >,
  "path"
> &
  RetrieveOrganizationByIdApiV1OrganizationsOrganizationIdGetPathParams;

/**
 * Retrieve Organization By Id
 */
export const useRetrieveOrganizationByIdApiV1OrganizationsOrganizationIdGet = ({
  organization_id,
  ...props
}: UseRetrieveOrganizationByIdApiV1OrganizationsOrganizationIdGetProps) =>
  useGet<
    OrganizationResponse,
    void | HTTPValidationError,
    void,
    RetrieveOrganizationByIdApiV1OrganizationsOrganizationIdGetPathParams
  >(
    (
      paramsInPath: RetrieveOrganizationByIdApiV1OrganizationsOrganizationIdGetPathParams,
    ) => `/api/v1/organizations/${paramsInPath.organization_id}`,
    { pathParams: { organization_id }, ...props },
  );

export interface ListAddressesApiV1AddressesGetQueryParams {
  postalCode?: string;
}

export type ListAddressesApiV1AddressesGetProps = Omit<
  GetProps<
    AddressResponse[],
    HTTPValidationError,
    ListAddressesApiV1AddressesGetQueryParams,
    void
  >,
  "path"
>;

/**
 * List Addresses
 */
export const ListAddressesApiV1AddressesGet = (
  props: ListAddressesApiV1AddressesGetProps,
) => (
  <Get<
    AddressResponse[],
    HTTPValidationError,
    ListAddressesApiV1AddressesGetQueryParams,
    void
  >
    path="/api/v1/addresses"
    {...props}
  />
);

export type UseListAddressesApiV1AddressesGetProps = Omit<
  UseGetProps<
    AddressResponse[],
    HTTPValidationError,
    ListAddressesApiV1AddressesGetQueryParams,
    void
  >,
  "path"
>;

/**
 * List Addresses
 */
export const useListAddressesApiV1AddressesGet = (
  props: UseListAddressesApiV1AddressesGetProps,
) =>
  useGet<
    AddressResponse[],
    HTTPValidationError,
    ListAddressesApiV1AddressesGetQueryParams,
    void
  >("/api/v1/addresses", props);

export interface RetrieveAddressByIdApiV1AddressesAddressIdGetPathParams {
  address_id: number;
}

export type RetrieveAddressByIdApiV1AddressesAddressIdGetProps = Omit<
  GetProps<
    AddressResponse,
    void | HTTPValidationError,
    void,
    RetrieveAddressByIdApiV1AddressesAddressIdGetPathParams
  >,
  "path"
> &
  RetrieveAddressByIdApiV1AddressesAddressIdGetPathParams;

/**
 * Retrieve Address By Id
 */
export const RetrieveAddressByIdApiV1AddressesAddressIdGet = ({
  address_id,
  ...props
}: RetrieveAddressByIdApiV1AddressesAddressIdGetProps) => (
  <Get<
    AddressResponse,
    void | HTTPValidationError,
    void,
    RetrieveAddressByIdApiV1AddressesAddressIdGetPathParams
  >
    path={`/api/v1/addresses/${address_id}`}
    {...props}
  />
);

export type UseRetrieveAddressByIdApiV1AddressesAddressIdGetProps = Omit<
  UseGetProps<
    AddressResponse,
    void | HTTPValidationError,
    void,
    RetrieveAddressByIdApiV1AddressesAddressIdGetPathParams
  >,
  "path"
> &
  RetrieveAddressByIdApiV1AddressesAddressIdGetPathParams;

/**
 * Retrieve Address By Id
 */
export const useRetrieveAddressByIdApiV1AddressesAddressIdGet = ({
  address_id,
  ...props
}: UseRetrieveAddressByIdApiV1AddressesAddressIdGetProps) =>
  useGet<
    AddressResponse,
    void | HTTPValidationError,
    void,
    RetrieveAddressByIdApiV1AddressesAddressIdGetPathParams
  >(
    (paramsInPath: RetrieveAddressByIdApiV1AddressesAddressIdGetPathParams) =>
      `/api/v1/addresses/${paramsInPath.address_id}`,
    { pathParams: { address_id }, ...props },
  );

export type ListRequirementsApiV1RequirementsGetProps = Omit<
  GetProps<RequirementResponse[], unknown, void, void>,
  "path"
>;

/**
 * List Requirements
 */
export const ListRequirementsApiV1RequirementsGet = (
  props: ListRequirementsApiV1RequirementsGetProps,
) => (
  <Get<RequirementResponse[], unknown, void, void>
    path="/api/v1/requirements"
    {...props}
  />
);

export type UseListRequirementsApiV1RequirementsGetProps = Omit<
  UseGetProps<RequirementResponse[], unknown, void, void>,
  "path"
>;

/**
 * List Requirements
 */
export const useListRequirementsApiV1RequirementsGet = (
  props: UseListRequirementsApiV1RequirementsGetProps,
) =>
  useGet<RequirementResponse[], unknown, void, void>(
    "/api/v1/requirements",
    props,
  );

export interface RetrieveRequirementByIdApiV1RequirementsRequirementIdGetPathParams {
  requirement_id: number;
}

export type RetrieveRequirementByIdApiV1RequirementsRequirementIdGetProps = Omit<
  GetProps<
    RequirementResponse,
    void | HTTPValidationError,
    void,
    RetrieveRequirementByIdApiV1RequirementsRequirementIdGetPathParams
  >,
  "path"
> &
  RetrieveRequirementByIdApiV1RequirementsRequirementIdGetPathParams;

/**
 * Retrieve Requirement By Id
 */
export const RetrieveRequirementByIdApiV1RequirementsRequirementIdGet = ({
  requirement_id,
  ...props
}: RetrieveRequirementByIdApiV1RequirementsRequirementIdGetProps) => (
  <Get<
    RequirementResponse,
    void | HTTPValidationError,
    void,
    RetrieveRequirementByIdApiV1RequirementsRequirementIdGetPathParams
  >
    path={`/api/v1/requirements/${requirement_id}`}
    {...props}
  />
);

export type UseRetrieveRequirementByIdApiV1RequirementsRequirementIdGetProps = Omit<
  UseGetProps<
    RequirementResponse,
    void | HTTPValidationError,
    void,
    RetrieveRequirementByIdApiV1RequirementsRequirementIdGetPathParams
  >,
  "path"
> &
  RetrieveRequirementByIdApiV1RequirementsRequirementIdGetPathParams;

/**
 * Retrieve Requirement By Id
 */
export const useRetrieveRequirementByIdApiV1RequirementsRequirementIdGet = ({
  requirement_id,
  ...props
}: UseRetrieveRequirementByIdApiV1RequirementsRequirementIdGetProps) =>
  useGet<
    RequirementResponse,
    void | HTTPValidationError,
    void,
    RetrieveRequirementByIdApiV1RequirementsRequirementIdGetPathParams
  >(
    (
      paramsInPath: RetrieveRequirementByIdApiV1RequirementsRequirementIdGetPathParams,
    ) => `/api/v1/requirements/${paramsInPath.requirement_id}`,
    { pathParams: { requirement_id }, ...props },
  );