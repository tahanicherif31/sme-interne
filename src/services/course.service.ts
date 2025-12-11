import {
  Course,
  CourseApplicationFormType,
  CourseRegistration,
} from "@/types/course.types";
import { axiosInstance, GraphqlEndpoints } from "./config";

const getAll = () => ({
  key: (props?: any) => ["getAllCourses", ...(props ? [props] : [])],
  fn: (locale: string) => () =>
    axiosInstance({
      method: "get",
      baseURL: process.env.NEXT_PUBLIC_WORDPRESS,
      url: `${GraphqlEndpoints.COURSE}`,
      params: { per_page: 1000 },
    }).then(
      (res) =>
        res.data.map((item: any) => ({
          id: item.id,
          ...item?.acf?.[`course_${locale}`],
        })) as Course[]
    ),
});

/* -------------------------------------------------------------------------- */
/*                                    find                                    */
/* -------------------------------------------------------------------------- */

const find = ({ slug, locale }: { slug: string; locale: string }) => ({
  key: (props?: any) => ["course", slug, locale, ...(props ? [props] : [])],
  fn: () =>
    axiosInstance({
      method: "get",
      baseURL: process.env.NEXT_PUBLIC_WORDPRESS,
      url: `${GraphqlEndpoints.COURSE}/${slug}`,
    }).then((res) => ({
      ...(res.data?.acf?.[`course_${locale}`] as Omit<Course, "id">),
      tabs: {
        overview:
          res.data?.acf?.[`course_${locale}`]?.tabs?.overview?.description ||
          "",
        skills_gained:
          res.data?.acf?.[`course_${locale}`]?.tabs?.skills_gained
            ?.description || "",
        course_outline: Object.values(
          res.data?.acf?.[`course_${locale}`]?.tabs?.course_outline || {}
        ) as Course["tabs"]["course_outline"][keyof Course["tabs"]["course_outline"]][],
      },
    })),
});

/* -------------------------------------------------------------------------- */
/*                                   create                                   */
/* -------------------------------------------------------------------------- */

const create = () => ({
  key: (props?: any) => ["create course", ...(props ? [props] : [])],
  fn: (data: Partial<Course>) =>
    axiosInstance({
      method: "post",
      url: `${GraphqlEndpoints.COURSES}`,
      data,
    }).then((res) => res.data as Course),
});

/* -------------------------------------------------------------------------- */
/*                                   update                                   */
/* -------------------------------------------------------------------------- */

const update = (id: string) => ({
  key: (props?: any) => ["update course", id, ...(props ? [props] : [])],
  fn: (data: Partial<Course>) =>
    axiosInstance({
      method: "put",
      url: `${GraphqlEndpoints.COURSES}/${id}`,
      data,
    }).then((res) => res.data as Course),
});

/* -------------------------------------------------------------------------- */
/*                              my-registrations                               */
/* -------------------------------------------------------------------------- */

const getMyRegistrations = () => ({
  key: (props?: any) => ["getMyCourseRegistrations", ...(props ? [props] : [])],
  fn: () =>
    axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.COURSES}/my-registrations`,
    }).then((res) => res.data as CourseRegistration[]),
});

/* -------------------------------------------------------------------------- */
/*                                  register                                  */
/* -------------------------------------------------------------------------- */

const register = () => ({
  key: (props?: any) => ["register for course", ...(props ? [props] : [])],
  fn: (data: CourseApplicationFormType & { courseId: string }) =>
    axiosInstance({
      method: "post",
      url: `${GraphqlEndpoints.COURSES}/register`,
      data,
    }).then((res) => res.data),
});

const course = {
  getAll,
  find,
  create,
  update,
  getMyRegistrations,
  register,
};

export default course;
