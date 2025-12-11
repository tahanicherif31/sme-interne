import user from "./user.service";
import company from "./company.service";
import event from "./event.service";
import course from "./course.service";
import auth from "./auth.service";
import document from "./document.service";
import analytics from "./analytics.service";
import health from "./health.service";

const api = {
  user,
  company,
  event,
  course,
  auth,
  document,
  analytics,
  health,
};

export default api;
