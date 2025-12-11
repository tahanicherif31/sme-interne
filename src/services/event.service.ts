import { Event, EventRegistration } from "@/types/event.types";
import { axiosInstance, GraphqlEndpoints } from "./config";

const getAll = () => ({
  key: (props?: any) => ["getAllEvents", ...(props ? [props] : [])],
  fn: (locale: string) => () =>
    axiosInstance({
      method: "get",
      baseURL: process.env.NEXT_PUBLIC_WORDPRESS,
      url: `${GraphqlEndpoints.EVENT}`,
      params: { per_page: 1000, _fields: `id,acf.event_${locale}` },
    }).then(
      (res) =>
        res.data.map((item: any) => ({
          id: item.id,
          ...item?.acf?.[`event_${locale}`],
        })) as Event[]
    ),
});

/* -------------------------------------------------------------------------- */
/*                                  getYears                                  */
/* -------------------------------------------------------------------------- */

export type EventYear = {
  id: string;
  year: string;
};

const getYears = () => ({
  key: (props?: any) => ["getEventsYears", ...(props ? [props] : [])],
  fn: () =>
    axiosInstance({
      method: "get",
      baseURL: process.env.NEXT_PUBLIC_WORDPRESS,
      url: `${GraphqlEndpoints.EVENTS_YEARS}`,
    }).then((res) => {
      const years = res.data
        .map((item: any) => item?.acf?.year)
        .filter(Boolean) as string[];

      const sortedYears = years.sort(
        (a, b) => Number.parseInt(b) - Number.parseInt(a)
      );
      return sortedYears;
    }),
});

/* -------------------------------------------------------------------------- */
/*                               getEventDetail                               */
/* -------------------------------------------------------------------------- */

const getEventDetail = ({ id, locale }: { id: string; locale: string }) => ({
  key: (props?: any) => [
    "getEventDetail",
    id,
    locale,
    ...(props ? [props] : []),
  ],
  fn: () =>
    axiosInstance({
      method: "get",
      baseURL: process.env.NEXT_PUBLIC_WORDPRESS,
      url: `${GraphqlEndpoints.EVENT}/${id}`,
    }).then((res) => {
      const event = res.data?.acf?.[`event_${locale}`] as Omit<Event, "id">;
      const partners: {
        logo: string;
        link: string;
      }[] = [];
      let i = 1;
      while (event.partnership[`logo_${i}`]) {
        const logo = event.partnership[`logo_${i}`];
        const link = event.partnership[`link_logo_${i}`];
        partners.push({ logo, link: link || "" });
        i++;
      }

      return { ...event, partners };
    }),
});

/* -------------------------------------------------------------------------- */
/*                                    find                                    */
/* -------------------------------------------------------------------------- */

const find = (id: string) => ({
  key: (props?: any) => ["find event", id, ...(props ? [props] : [])],
  fn: () =>
    axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.EVENTS}/${id}`,
    }).then((res) => res.data as Event),
});

/* -------------------------------------------------------------------------- */
/*                                   create                                   */
/* -------------------------------------------------------------------------- */

const create = () => ({
  key: (props?: any) => ["create event", ...(props ? [props] : [])],
  fn: (data: Partial<Event>) =>
    axiosInstance({
      method: "post",
      url: `${GraphqlEndpoints.EVENTS}`,
      data,
    }).then((res) => res.data as Event),
});

/* -------------------------------------------------------------------------- */
/*                                   update                                   */
/* -------------------------------------------------------------------------- */

const update = (id: string) => ({
  key: (props?: any) => ["update event", id, ...(props ? [props] : [])],
  fn: (data: Partial<Event>) =>
    axiosInstance({
      method: "put",
      url: `${GraphqlEndpoints.EVENTS}/${id}`,
      data,
    }).then((res) => res.data as Event),
});

/* -------------------------------------------------------------------------- */
/*                              my-registrations                              */
/* -------------------------------------------------------------------------- */

const getMyRegistrations = () => ({
  key: (props?: any) => ["getMyEventRegistrations", ...(props ? [props] : [])],
  fn: () =>
    axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.EVENTS}/my-registrations`,
    }).then((res) => res.data as EventRegistration[]),
});

/* -------------------------------------------------------------------------- */
/*                                  register                                  */
/* -------------------------------------------------------------------------- */

const register = () => ({
  key: (props?: any) => ["register for event", ...(props ? [props] : [])],
  fn: (data: { eventId: string }) =>
    axiosInstance({
      method: "post",
      url: `${GraphqlEndpoints.EVENTS}/register`,
      data,
    }).then((res) => res.data),
});

const event = {
  getAll,
  find,
  create,
  update,
  getMyRegistrations,
  register,
  getYears,
  getEventDetail,
};

export default event;
