
export const NATION_ID = {
  THAI: "6523b89466557a034183d9d0",
};
export const GENDERS = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
  { id: "none", label: "None" },
];

export const FROM_SYSTEM = "WEB_PASSPORT";
export const SOURCE = "web";
export const REGISTER_TYPE = {
  ONLINE : "online",
  ONSITE: "onsite"
}
export const GOTO = {
  SURVEY: "survey",
  PASS_ID: "passid",
  INFORMATION: "register",
  PERSONAL: "personal",
  EVENT_LANDING: "event-landing",
  VIDEO_CONTENT: "video-content",
  EVENT_DETAIL: "event-detail",
  EVENT_CLOSED: "event-closed",
  EVENT_NOT_FOUND: "event-not-found",
  UNAUTHORIZED: "unauthorized"
};

export const SEND_OTP_TYPE = {
  MOBILE: "mobile",
  EMAIL: "email",
};

export const OTP_TYPE = {
  LOGIN: "login",
  REGISTER: "register",
  VERIFY: "verify"
};

export const QUESTION_TYPE = {
  MULTIPLE_CHOICE : "multiple_choice",
  SINGLE_CHOICE : "one_choice",
  SHORT_TEXT: "short_text"
}

export const HTTP_STATUS_CODE = {
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  OK: 200,
  BAD_GATEWAY: 502,
  INTERNAL_SERVER_ERROR: 500,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_MODIFIED: 304
}