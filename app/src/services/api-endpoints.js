/* eslint-disable prefer-template */

const API_BASE_URL = process.env.API_BASE_URL;
const LAUNCH_XDEBUG = process.env.DEBUG_MODE;
const xDebugQueryString = 'XDEBUG_SESSION_START=10639';
const xDebugWithAmpersand = LAUNCH_XDEBUG ? '&' + xDebugQueryString : '';
const xDebugWithQuestionMark = LAUNCH_XDEBUG ? '?' + xDebugQueryString : '';

const API_END_POINTS = Object.freeze({
  AIRPORTS: {
    INDEX: `${API_BASE_URL}/airports?q${xDebugWithAmpersand}`,
  },
  CLAIMS_TYPES: {
    LOAD: `${API_BASE_URL}/claim-types${xDebugWithQuestionMark}`,
  },
  COUNTRIES: {
    INDEX: `${API_BASE_URL}/countries?q${xDebugWithAmpersand}`,
  },
  DELAYS: {
    LOAD: `${API_BASE_URL}/delays${xDebugWithQuestionMark}`,
  },
  DESTINATION_AIRPORTS: {
    INDEX: `${API_BASE_URL}/destination-airports/:departureAirportId${xDebugWithAmpersand}`,
  },
  AIRLINES_FOR_FLIGHT_ROUTE: {
    INDEX: `${API_BASE_URL}/airlines-for-flight-route/:departureAirportId/:destinationAirportId`
    + xDebugWithQuestionMark,
  },
  CLAIMS: {
    SUBMIT: `${API_BASE_URL}/claims${xDebugWithQuestionMark}`,
  },
  CONTACT_REQUEST: {
    SUBMIT: `${API_BASE_URL}/contact-request${xDebugWithQuestionMark}`,
  },
  MUNICIPALITIES: {
    INDEX: `${API_BASE_URL}/airport-municipalities?q${xDebugWithAmpersand}`,
  },
  SALUTATIONS: {
    LOAD: `${API_BASE_URL}/salutations${xDebugWithQuestionMark}`,
  },
});

export default API_END_POINTS;
