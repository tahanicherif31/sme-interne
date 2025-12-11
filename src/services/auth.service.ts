import { User } from "@/types/user.types";
import { axiosInstance, GraphqlEndpoints } from "./config";

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiresIn: number;
  message: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
  businessName: string;
  countryOfRegistration: string;
  businessRegistrationNumber: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  captchaToken: string;
};

export type SignUpResponse = {
  message: string;
  userId?: string;
};

export type ConfirmSignUpRequest = {
  email: string;
  code: number;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ConfirmForgotPasswordRequest = {
  email: string;
  code: string;
  newPassword: string;
};

export type CheckUserRequest = {
  email: string;
};

export type CheckUserResponse = {
  exists: boolean;
};

/* -------------------------------------------------------------------------- */
/*                                   signin                                   */
/* -------------------------------------------------------------------------- */

const signin = () => ({
  key: (props?: any) => ["signin", ...(props ? [props] : [])],
  fn: (data: SignInRequest) =>
    axiosInstance({
      method: "post",
      url: `${GraphqlEndpoints.AUTH}/signin`,
      data,
    }).then((res) => res.data as SignInResponse),
});

/* -------------------------------------------------------------------------- */
/*                                   signup                                   */
/* -------------------------------------------------------------------------- */

const signup = () => ({
  key: (props?: any) => ["signup", ...(props ? [props] : [])],
  fn: (data: SignUpRequest) =>
    axiosInstance({
      method: "post",
      url: `${GraphqlEndpoints.AUTH}/signup`,
      data,
    }).then((res) => res.data as SignUpResponse),
});

/* -------------------------------------------------------------------------- */
/*                               confirm-signup                                */
/* -------------------------------------------------------------------------- */

const confirmSignup = () => ({
  key: (props?: any) => ["confirm-signup", ...(props ? [props] : [])],
  fn: (data: ConfirmSignUpRequest) =>
    axiosInstance({
      method: "post",
      url: `${GraphqlEndpoints.AUTH}/confirm-signup`,
      data,
    }).then((res) => res.data),
});

/* -------------------------------------------------------------------------- */
/*                              forgot-password                                */
/* -------------------------------------------------------------------------- */

const forgotPassword = () => ({
  key: (props?: any) => ["forgot-password", ...(props ? [props] : [])],
  fn: (data: ForgotPasswordRequest) =>
    axiosInstance({
      method: "post",
      url: `${GraphqlEndpoints.AUTH}/forgot-password`,
      data,
    }).then((res) => res.data),
});

/* -------------------------------------------------------------------------- */
/*                          confirm-forgot-password                            */
/* -------------------------------------------------------------------------- */

const confirmForgotPassword = () => ({
  key: (props?: any) => ["confirm-forgot-password", ...(props ? [props] : [])],
  fn: (data: ConfirmForgotPasswordRequest) =>
    axiosInstance({
      method: "post",
      url: `${GraphqlEndpoints.AUTH}/confirm-forgot-password`,
      data,
    }).then((res) => res.data),
});

/* -------------------------------------------------------------------------- */
/*                                 signout                                    */
/* -------------------------------------------------------------------------- */

const signout = () => ({
  key: (props?: any) => ["signout", ...(props ? [props] : [])],
  fn: () =>
    axiosInstance({
      method: "post",
      url: `${GraphqlEndpoints.AUTH}/signout`,
    }).then((res) => res.data),
});

/* -------------------------------------------------------------------------- */
/*                                  check-user                                 */
/* -------------------------------------------------------------------------- */

const checkUser = () => ({
  key: (props?: any) => ["check-user", ...(props ? [props] : [])],
  fn: (data: CheckUserRequest) =>
    axiosInstance({
      method: "post",
      url: `${GraphqlEndpoints.AUTH}/check-user`,
      data,
    }).then((res) => res.data as CheckUserResponse),
});

/* -------------------------------------------------------------------------- */
/*                                    me                                      */
/* -------------------------------------------------------------------------- */

const me = () => ({
  key: (props?: any) => ["me", ...(props ? [props] : [])],
  fn: () => {
    return axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.AUTH}/me`,
    }).then((res) => res.data as User);
  },
});

const auth = {
  signin,
  signup,
  confirmSignup,
  forgotPassword,
  confirmForgotPassword,
  signout,
  checkUser,
  me,
};

export default auth;
