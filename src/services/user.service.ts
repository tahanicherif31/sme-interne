import { User } from "@/types/user.types";
import { axiosInstance, GraphqlEndpoints } from "./config";
import { Pagination, HasPagination } from "./types";
import { Company } from "@/types/company.types";

export type UpdateProfileRequest = {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profileImage?: File | string | null;
  };
  company: Partial<Company>;
};

export type GetAllUsersVariables = {
  filter?: {
    searchTerm?: string;
    email?: string;
    status?: string;
    startDate?: Date;
    endDate?: Date;
  };
  pagination: Pagination;
};

const getAll = () => ({
  key: (props?: any) => ["getAllUsers", ...(props ? [props] : [])],
  fn: (variables: GetAllUsersVariables) => () =>
    axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.USERS}`,
      params: { ...variables.filter, ...variables.pagination },
    }).then((res) => res.data as HasPagination<User>),
});

/* -------------------------------------------------------------------------- */
/*                                    find                                    */
/* -------------------------------------------------------------------------- */

const find = (id: string) => ({
  key: (props?: any) => ["find user", id, ...(props ? [props] : [])],
  fn: () =>
    axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.USERS}/${id}`,
    }).then((res) => res.data as User),
});

/* -------------------------------------------------------------------------- */
/*                                   create                                   */
/* -------------------------------------------------------------------------- */

const create = () => ({
  key: (props?: any) => ["create user", ...(props ? [props] : [])],
  fn: (data: Partial<User>) =>
    axiosInstance({
      method: "post",
      url: `${GraphqlEndpoints.USERS}`,
      data,
    }).then((res) => res.data as User),
});

/* -------------------------------------------------------------------------- */
/*                                   update                                   */
/* -------------------------------------------------------------------------- */

const update = (id: string) => ({
  key: (props?: any) => ["update user", id, ...(props ? [props] : [])],
  fn: (data: Partial<User>) =>
    axiosInstance({
      method: "put",
      url: `${GraphqlEndpoints.USERS}/${id}`,
      data,
    }).then((res) => res.data as User),
});

/* -------------------------------------------------------------------------- */
/*                                  profile                                   */
/* -------------------------------------------------------------------------- */

const getProfile = () => ({
  key: (props?: any) => ["user profile", ...(props ? [props] : [])],
  fn: () =>
    axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.USERS}/profile`,
    }).then((res) => res.data as { profile: User; company: Company }),
});

/* -------------------------------------------------------------------------- */
/*                               update-profile                               */
/* -------------------------------------------------------------------------- */

const updateProfile = () => ({
  key: (props?: any) => ["updateUserProfile", ...(props ? [props] : [])],
  fn: (data: UpdateProfileRequest) =>
    axiosInstance({
      method: "put",
      url: `${GraphqlEndpoints.USERS}/profile`,
      data,
    }).then((res) => res.data as { profile: User; company: Company }),
});

/* -------------------------------------------------------------------------- */
/*                        initiate-profile-picture                             */
/* -------------------------------------------------------------------------- */

const initiateProfilePicture = () => ({
  key: (props?: any) => ["initiate profile picture", ...(props ? [props] : [])],
  fn: (data: { fileName: string; contentType: string; sizeBytes: number }) =>
    axiosInstance({
      method: "post",
      url: `${GraphqlEndpoints.USERS}/profile/picture/initiate`,
      data,
    }).then((res) => res.data),
});

/* -------------------------------------------------------------------------- */
/*                         confirm-profile-picture                             */
/* -------------------------------------------------------------------------- */

const confirmProfilePicture = () => ({
  key: (props?: any) => ["confirm profile picture", ...(props ? [props] : [])],
  fn: (data: { documentId: string }) =>
    axiosInstance({
      method: "post",
      url: `${GraphqlEndpoints.USERS}/profile/picture/confirm`,
      data,
    }).then((res) => res.data),
});

const user = {
  getAll,
  find,
  create,
  update,
  getProfile,
  updateProfile,
  initiateProfilePicture,
  confirmProfilePicture,
};

export default user;
