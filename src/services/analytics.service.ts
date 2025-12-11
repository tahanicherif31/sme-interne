import { axiosInstance, GraphqlEndpoints } from "./config";

export type CompanyAnalytics = {
  totalCompanies: number;
  activeCompanies: number;
  newCompaniesThisMonth: number;
  companiesByCountry: Array<{ country: string; count: number }>;
  companiesBySector: Array<{ sector: string; count: number }>;
};

export type CourseAnalytics = {
  totalCourses: number;
  activeCourses: number;
  totalEnrollments: number;
  enrollmentsByCourse: Array<{
    courseId: string;
    courseName: string;
    count: number;
  }>;
  completionRate: number;
};

export type EventAnalytics = {
  totalEvents: number;
  upcomingEvents: number;
  totalRegistrations: number;
  registrationsByEvent: Array<{
    eventId: string;
    eventName: string;
    count: number;
  }>;
  attendanceRate: number;
};

export type UserAnalytics = {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  usersByCountry: Array<{ country: string; count: number }>;
};

export type PlatformOverviewAnalytics = {
  totalUsers: number;
  totalCompanies: number;
  totalApplications: number;
  totalEvents: number;
  totalCourses: number;
  activeApplications: number;
  recentActivity: Array<{
    type: string;
    description: string;
    timestamp: Date;
  }>;
};

/* -------------------------------------------------------------------------- */
/*                              getCompanyAnalytics                           */
/* -------------------------------------------------------------------------- */

const getCompany = () => ({
  key: (props?: any) => ["getCompanyAnalytics", ...(props ? [props] : [])],
  fn: (filter?: { startDate?: Date; endDate?: Date }) => () =>
    axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.ANALYTICS}/companies`,
      params: filter,
    }).then((res) => res.data as CompanyAnalytics),
});

/* -------------------------------------------------------------------------- */
/*                               getCourseAnalytics                            */
/* -------------------------------------------------------------------------- */

const getCourse = () => ({
  key: (props?: any) => ["getCourseAnalytics", ...(props ? [props] : [])],
  fn: (filter?: { startDate?: Date; endDate?: Date }) => () =>
    axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.ANALYTICS}/courses`,
      params: filter,
    }).then((res) => res.data as CourseAnalytics),
});

/* -------------------------------------------------------------------------- */
/*                               getEventAnalytics                             */
/* -------------------------------------------------------------------------- */

const getEvent = () => ({
  key: (props?: any) => ["getEventAnalytics", ...(props ? [props] : [])],
  fn: (filter?: { startDate?: Date; endDate?: Date }) => () =>
    axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.ANALYTICS}/events`,
      params: filter,
    }).then((res) => res.data as EventAnalytics),
});

/* -------------------------------------------------------------------------- */
/*                              getUserAnalytics                               */
/* -------------------------------------------------------------------------- */

const getUser = () => ({
  key: (props?: any) => ["getUserAnalytics", ...(props ? [props] : [])],
  fn: (filter?: { startDate?: Date; endDate?: Date }) => () =>
    axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.ANALYTICS}/users`,
      params: filter,
    }).then((res) => res.data as UserAnalytics),
});

/* -------------------------------------------------------------------------- */
/*                            getPlatformOverview                             */
/* -------------------------------------------------------------------------- */

const getPlatformOverview = () => ({
  key: (props?: any) => ["getPlatformOverview", ...(props ? [props] : [])],
  fn: (filter?: { startDate?: Date; endDate?: Date }) => () =>
    axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.ANALYTICS}/overview`,
      params: filter,
    }).then((res) => res.data as PlatformOverviewAnalytics),
});

const analytics = {
  getCompany,
  getCourse,
  getEvent,
  getUser,
  getPlatformOverview,
};

export default analytics;
