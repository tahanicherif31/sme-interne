import z from "zod";
import { courseSchema } from "@/validation/course.validation";

export type Course = {
  id: string;
  title: string;
  image: string;
  instructor: string;
  tag: string;
  session_date: string;
  format: string;
  location: string;
  slots_available: string;
  tabs: {
    overview: { description: string };
    skills_gained: { description: string };
    course_outline: Record<
      string,
      {
        title: string;
        description: string;
      }
    >;
  };
};

export type CourseApplicationFormType = z.infer<typeof courseSchema>;

export type CourseRegistration = {
  completionStatus: string;
  companyId: string;
  userId: string;
  registeredAt: string;
  progress: number;
  courseId: string;
  id: string;
};
