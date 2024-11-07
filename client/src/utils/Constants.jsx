// Company data
export const CompanyName = 'ArduPlot 3D';
export const CompanyPhoneNumber = '07846286385';
export const ContactEmailAddress = 'hello@bytetoast-studio.com';
export const DirectorName = 'Tom Brockington';

// Cookie data
export const NumberOfCookies = 0;
export const COOKIE_TIMER = 5000;
export const CookiePolicyName = 'CookiePolicy';

// Pages
export const HOME_PAGE_URL = '/';
export const LOGIN_PAGE_URL = '/login';
export const SIGN_UP_PAGE_URL = '/sign-up';
export const SIMULATION_PAGE_URL = '/design';
export const LIBRARY_PAGE_URL = '/library';
export const CONFIGURATION_PAGE_URL = '/device-configuration';
export const POLICIES_PAGE_URL = '/user-agreements';
export const ADMIN_PAGE_URL = '/admin';
export const MAINTENANCE_PAGE_URL = '/down-for-maintenance';
export const RESET_PASS_PAGE_URL = '/request-new-password';
export const TEST_PAGE_URL = '/test';
export const ERROR_404_PAGE_URL = '*';

// Routes
// User
export const LOGIN_API = '/login';
export const GET_USER_API = '/users/user/get-user-by-id'; // userId
export const GET_LOGGED_IN_USER_API = '/users/user/get-logged-in-user'; // userId
export const REGISTER_API = '/users/register';
export const RESET_PASSWORD_API = '/users/user/reset-password'; // userId
export const DELETE_ACCOUNT_API = '/users/user/delete-account'; // userId
// Simulations
export const CREATE_NEW_SIMULATION_API =
  '/simulations/user/create-new-simulation';
export const SAVE_SIMULATION_API = '/simulations/user/save-simulation';
export const LOAD_SIMULATION_API = '/simulations/user/load-simulation';
export const GET_ALL_USER_SIMULATIONS_API = '/simulations/user/get-all-user-simulations';
export const GET_ALL_USER_SIMULATIONS_AND_LOOPS_API = '/simulations/user/get-all-user-simulation-and-loops';
export const GET_USER_SIMULATIONS_LIST_API = '/simulations/user/get-list-of-simulations';
export const PUBLISH_SIMULATION_API =
  '/simulations/user/publish-simulation-to-library';
export const GET_LIBRARY_SIMULATIONS_API = '/library/get-all-library-publications';
export const PUBLISH_LIBRARY_SIMULATIONS_API = '/library/publish-new-simulation';
export const LIBRARY_VOTE_API = '/library/vote-on-simulation/';
