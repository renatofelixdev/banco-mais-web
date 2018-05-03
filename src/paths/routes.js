const DOMAIN = "http://localhost:9000";

export const LOGIN_USER_MASTER = DOMAIN + "/api/user-master/login";

export const LIST_BANKS = DOMAIN + "/api/banks";
export const POST_BANK = DOMAIN + "/api/bank";
export const BANK = DOMAIN + "/api/bank/:id";
export const BANK_STATUS = DOMAIN + "/api/bank/:id/status";

export const LIST_BANKS_AGENCIES = DOMAIN + "/api/bank-agencies";
export const POST_BANK_AGENCY = DOMAIN + "/api/bank-agency";
export const BANK_AGENCY = DOMAIN + "/api/bank-agency/:id";
export const BANK_AGENCY_STATUS = DOMAIN + "/api/bank-agency/:id/status";

export const LIST_USERS_CLIENT = DOMAIN + "/api/users-client";
export const POST_USER_CLIENT = DOMAIN + "/api/user-client";
export const USER_CLIENT = DOMAIN + "/api/user-client/:id";
export const USER_CLIENT_STATUS = DOMAIN + "/api/user-client/:id/status";
