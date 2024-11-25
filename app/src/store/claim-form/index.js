// eslint-disable-next-line
/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */

import API_END_POINTS from '../../services/api-endpoints';
import Claim from '../../models/claim.model';
import ClaimType from '../../models/list-items/claim-type.list-item.model';
import flightsModule, { INITIALIZE_FLIGHT_STATE } from '../claim-form/flights';
import complainantModule, { INITIALIZE_COMPLAINANT_STATE } from './complainant';
import Delay from '../../models/list-items/delay.list-item.model';
import ApiResult from '../../models/api-result.model';

export const SET_CURRENT_STEP = 'SET_CURRENT_STEP';
const CURRENT_STEP_WAS_SET = 'CURRENT_STEP_WAS_SET';

export const UPDATE_CLAIM_FIELD = 'UPDATE_CLAIM_FIELD';
const CLAIM_FIELD_WAS_UPDATED = 'CLAIM_FIELD_WAS_UPDATED';

export const SUBMIT_CLAIM = 'SUBMIT_CLAIM';
const CLAIM_WAS_SUBMITTED = 'CLAIM_WAS_SUBMITTED';
const CLAIM_FORM_WAS_CLEARED = 'CLAIM_FORM_WAS_CLEARED';

export const LOAD_CLAIM_TYPES = 'LOAD_CLAIM_TYPES';
const CLAIM_TYPES_LOADED = 'CLAIM_TYPES_LOADED';

export const LOAD_DELAYS = 'LOAD_DELAYS';
const DELAYS_LOADED = 'DELAYS_LOADED';

const CLAIM_SUBMISSION_SUCCEEDED = 'CLAIM_SUBMISSION_SUCCEEDED';
const CLAIM_SUBMISSION_FAILED = 'CLAIM_SUBMISSION_FAILED';
const CLAIM_STATUS_RESET = 'CLAIM_STATUS_RESET';

const transformFlightToApi = (flightToTransform) => {
  const flight = {
    delay_id: flightToTransform.delay.id,
    flight_date: new Date(flightToTransform.flightDate).toUTCString(),
    flight_order: flightToTransform.flightOrder,
    flight_number_is_known: flightToTransform.flightNumberIsKnown,
    is_initial_flight: flightToTransform.isInitial,
  };

  if (flightToTransform.flightNumberIsKnown === true) {
    flight.flight_number = flightToTransform.flightNumber;
  } else {
    flight.departure_airport_id = (flightToTransform.departureAirport.id > 0)
      ? flightToTransform.departureAirport.id
      : null;
    flight.destination_airport_id = (flightToTransform.destinationAirport.id > 0)
      ? flightToTransform.destinationAirport.id
      : null;
    flight.airline_id = (flightToTransform.airline.id > 0) ? flightToTransform.airline.id : null;
  }

  return flight;
};

const claimFormModule = {
  state: new Claim(),
  actions: {
    [LOAD_CLAIM_TYPES]({ commit }) {
      window.Vue.$http
            .get(API_END_POINTS.CLAIMS_TYPES.LOAD)
            .then(response => commit(
              CLAIM_TYPES_LOADED,
              ClaimType.createListFromBackendModel(response.data.data)));
    },
    [LOAD_DELAYS]({ commit }) {
      window.Vue.$http
            .get(API_END_POINTS.DELAYS.LOAD)
            .then(response => commit(
              DELAYS_LOADED,
              Delay.createListFromBackendModel(response.data.data)));
    },
    [SET_CURRENT_STEP]({ commit }, payload) {
      commit(CURRENT_STEP_WAS_SET, payload);

      if (payload.currentStep === 1) {
        commit(CLAIM_STATUS_RESET);
      }
    },
    [UPDATE_CLAIM_FIELD]({ commit }, payload) {
      let value = null;

      switch (payload.field) {
        case 'claimType':
          value = payload.value;

          break;
        default:
          value = payload.value;
      }

      commit(CLAIM_FIELD_WAS_UPDATED, { field: payload.field, value });
    },
    [SUBMIT_CLAIM]({ commit, dispatch, state, rootState }) {
      const flights = [];

      state.flights.all.getAll().map(flight => flights.push(transformFlightToApi(flight, true)));

      const claim = {
        claim_type_id: state.claimType.id,
        remarks: state.remarks,
        complainant: {
          language: rootState.i18n.locale,
          first_name: state.complainant.firstName,
          last_name: state.complainant.lastName,
          salutation_id: state.complainant.salutation.id,
          country_id: state.complainant.country.id,
          postal_code: state.complainant.postalCode,
          city: state.complainant.city,
          street: state.complainant.street,
          house_number: state.complainant.houseNumber,
          box_number: state.complainant.boxNumber,
          email: state.complainant.email,
          phone_number: state.complainant.phoneNumber,
        },
        flights,
      };

      //eslint-disable-next-line
      console.info({ claim });

      commit(CLAIM_STATUS_RESET);

      return new Promise((resolve, reject) => {
        window.Vue.$http
              .post(API_END_POINTS.CLAIMS.SUBMIT, claim)
              .then(
                () => {
                  commit(CLAIM_WAS_SUBMITTED);
                  dispatch(INITIALIZE_FLIGHT_STATE);
                  dispatch(INITIALIZE_COMPLAINANT_STATE);
                  commit(CLAIM_FORM_WAS_CLEARED);

                  commit(CLAIM_SUBMISSION_SUCCEEDED);

                  const result = new ApiResult();

                  result.submitted = true;
                  result.success = true;

                  resolve(result);
                },
                (response) => {
                  const result = new ApiResult();

                  result.submitted = true;
                  result.success = false;

                  switch (response.status) {
                    case 422:
                      result.message = 'error.validation-failed';
                      result.component = response.body.error.component;

                      if (typeof response.body.error.index !== 'undefined') {
                        result.index = response.body.error.index;
                      }

                      break;
                    case 500:
                      result.message = 'error.server';

                      break;
                    default:
                      result.message = 'error.unknown';
                  }

                  // eslint-disable-next-line
                  console.log({ response });

                  commit(CLAIM_SUBMISSION_FAILED, { status: result });

                  reject(result);
                },
              );
      });
    },
  },
  mutations: {
    [CLAIM_TYPES_LOADED](state, payload) {
      state.claimTypes = payload;
    },
    [DELAYS_LOADED](state, payload) {
      state.delays = payload;
    },
    [CURRENT_STEP_WAS_SET](state, payload) {
      state.currentStep = payload.currentStep;
    },
    [CLAIM_FIELD_WAS_UPDATED](state, payload) {
      state[payload.field] = payload.value;
    },
    [CLAIM_WAS_SUBMITTED]() {
    },
    [CLAIM_FORM_WAS_CLEARED](state) {
      state.currentStep = 1;
      state.claimType = new ClaimType();
      state.agreesWithGeneralTerms = false;
      state.remarks = '';
    },
    [CLAIM_SUBMISSION_SUCCEEDED](state) {
      state.status.submitted = true;
      state.status.success = true;
    },
    [CLAIM_SUBMISSION_FAILED](state, payload) {
      state.status = payload.status;
    },
    [CLAIM_STATUS_RESET](state) {
      state.status = new ApiResult();
    },
  },
  modules: {
    flights: flightsModule,
    complainant: complainantModule,
  },
};

export default claimFormModule;
