import Cookies from "js-cookie";

// Cookie configuration
export const ID_TOKEN_COOKIE_NAME = "idToken";
export const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

// Client-side token utilities (for use in client components)
export const tokenUtils = {
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      Cookies.set(ID_TOKEN_COOKIE_NAME, token, COOKIE_OPTIONS);
    }
  },
  getToken: async () => {
    let token: string | undefined;
    if (typeof window !== "undefined") {
      token = Cookies.get(ID_TOKEN_COOKIE_NAME);
    } else {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      token = cookieStore.get(ID_TOKEN_COOKIE_NAME)?.value;
    }
    return token;
  },
  setAccessToken: (token: string) => {
    if (typeof window !== "undefined") {
      Cookies.set(ACCESS_TOKEN_COOKIE_NAME, token, COOKIE_OPTIONS);
    }
  },
  getAccessToken: async () => {
    let token: string | undefined;
    if (typeof window !== "undefined") {
      token = Cookies.get(ACCESS_TOKEN_COOKIE_NAME);
    } else {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      token = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
    }
    return token;
  },
  removeTokens: () => {
    if (typeof window !== "undefined") {
      Cookies.remove(ID_TOKEN_COOKIE_NAME, { path: "/" });
      Cookies.remove(ACCESS_TOKEN_COOKIE_NAME, { path: "/" });
    }
  },
};
