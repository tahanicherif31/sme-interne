import { axiosInstance, GraphqlEndpoints } from "./config";

export type HealthStatus = {
  status: "healthy" | "unhealthy";
  timestamp: string;
  uptime: number;
  version?: string;
};

export type DetailedHealthStatus = {
  status: "healthy" | "unhealthy";
  timestamp: string;
  uptime: number;
  version?: string;
  dependencies: {
    database?: {
      status: "healthy" | "unhealthy";
      responseTime?: number;
    };
    s3?: {
      status: "healthy" | "unhealthy";
      responseTime?: number;
    };
    [key: string]: any;
  };
};

/* -------------------------------------------------------------------------- */
/*                                  health                                    */
/* -------------------------------------------------------------------------- */

const find = () => ({
  key: (props?: any) => ["health", ...(props ? [props] : [])],
  fn: () =>
    axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.HEALTH}`,
    }).then((res) => res.data as DetailedHealthStatus),
});

/* -------------------------------------------------------------------------- */
/*                                liveness                                    */
/* -------------------------------------------------------------------------- */

const liveness = () => ({
  key: (props?: any) => ["health liveness", ...(props ? [props] : [])],
  fn: () =>
    axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.HEALTH}/liveness`,
    }).then((res) => res.data as HealthStatus),
});

/* -------------------------------------------------------------------------- */
/*                               readiness                                    */
/* -------------------------------------------------------------------------- */

const readiness = () => ({
  key: (props?: any) => ["health readiness", ...(props ? [props] : [])],
  fn: () =>
    axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.HEALTH}/readiness`,
    }).then((res) => res.data as HealthStatus),
});

const health = {
  find,
  liveness,
  readiness,
};

export default health;
