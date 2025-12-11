import { Company } from "@/types/company.types";
import { axiosInstance, GraphqlEndpoints } from "./config";
import { Pagination, HasPagination } from "./types";

export type GetAllCompaniesVariables = {
  filter?: {
    searchTerm?: string;
    companyName?: string;
    countryRegistration?: string;
    sector?: string;
    status?: string;
    startDate?: Date;
    endDate?: Date;
  };
  pagination: Pagination;
};

const getAll = () => ({
  key: (props?: any) => ["getAllCompanies", ...(props ? [props] : [])],
  fn: (variables: GetAllCompaniesVariables) => () =>
    axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.COMPANIES}`,
      params: { ...variables.filter, ...variables.pagination },
    }).then((res) => res.data as HasPagination<Company>),
});

/* -------------------------------------------------------------------------- */
/*                                    find                                    */
/* -------------------------------------------------------------------------- */

const find = (id: string) => ({
  key: (props?: any) => ["find company", id, ...(props ? [props] : [])],
  fn: () =>
    axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.COMPANIES}/${id}`,
    }).then((res) => res.data as Company),
});

/* -------------------------------------------------------------------------- */
/*                                   create                                   */
/* -------------------------------------------------------------------------- */

const create = () => ({
  key: (props?: any) => ["create company", ...(props ? [props] : [])],
  fn: (data: Partial<Company>) =>
    axiosInstance({
      method: "post",
      url: `${GraphqlEndpoints.COMPANIES}`,
      data,
    }).then((res) => res.data as Company),
});

/* -------------------------------------------------------------------------- */
/*                                   update                                   */
/* -------------------------------------------------------------------------- */

const update = (id: string) => ({
  key: (props?: any) => ["update company", id, ...(props ? [props] : [])],
  fn: (data: Partial<Company>) =>
    axiosInstance({
      method: "put",
      url: `${GraphqlEndpoints.COMPANIES}/${id}`,
      data,
    }).then((res) => res.data as Company),
});

/* -------------------------------------------------------------------------- */
/*                               my-company                                   */
/* -------------------------------------------------------------------------- */

const getMyCompany = () => ({
  key: (props?: any) => ["getMyCompany", ...(props ? [props] : [])],
  fn: () =>
    axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.COMPANIES}/my-company`,
    }).then((res) => res.data as Company),
});

/* -------------------------------------------------------------------------- */
/*                            update-my-company                               */
/* -------------------------------------------------------------------------- */

const updateMyCompany = () => ({
  key: (props?: any) => ["updateMyCompany", ...(props ? [props] : [])],
  fn: (data: Partial<Company>) =>
    axiosInstance({
      method: "put",
      url: `${GraphqlEndpoints.COMPANIES}/my-company`,
      data,
    }).then((res) => res.data as Company),
});

const company = {
  getAll,
  find,
  create,
  update,
  getMyCompany,
  updateMyCompany,
};

export default company;
