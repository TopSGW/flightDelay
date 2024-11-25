// eslint-disable-next-line
/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */

import FlightCollection from '../../../models/flight-collection.model';
import API_END_POINTS from '../../../services/api-endpoints';
import AirportListItem from '../../../models/list-items/airport.list-item.model';
import MunicipalityListItem from '../../../models/list-items/municipality.list-item.model';
import AirlineListItem from '../../../models/list-items/airline.list-item.model';

export const INITIALIZE_FLIGHT_STATE = 'INITIALIZE_FLIGHT_STATE';
const FLIGHT_STATE_INITIALIZED = 'FLIGHT_STATE_INITIALIZED';

export const UPDATE_FLIGHT = 'UPDATE_FLIGHT';
const FLIGHT_UPDATED = 'FLIGHT_UPDATED';

export const ADD_FLIGHT = 'ADD_FLIGHT';
const FLIGHT_ADDED = 'FLIGHT_ADDED';

export const SET_CURRENT_FLIGHT_ORDER = 'SET_CURRENT_FLIGHT_ORDER';
const CURRENT_FLIGHT_ORDER_SET = 'CURRENT_FLIGHT_ORDER_SET';

export const GET_DEPARTURE_MUNICIPALITIES = 'GET_DEPARTURE_MUNICIPALITIES';

export const SET_DEPARTURE_MUNICIPALITY = 'SET_DEPARTURE_MUNICIPALITY';
const DEPARTURE_MUNICIPALITY_SET = 'DEPARTURE_MUNICIPALITY_SET';

export const GET_AIRPORTS_FOR_DEPARTURE_MUNICIPALITY = 'GET_AIRPORTS_FOR_DEPARTURE_MUNICIPALITY';
const AIRPORTS_FOR_DEPARTURE_MUNICIPALITY_RETRIEVED = 'AIRPORTS_FOR_DEPARTURE_MUNICIPALITY_RETRIEVED';

export const SET_DEPARTURE_AIRPORT = 'SET_DEPARTURE_AIRPORT';
const DEPARTURE_AIRPORT_SET = 'DEPARTURE_AIRPORT_SET';

export const GET_DESTINATION_MUNICIPALITIES = 'GET_DESTINATION_MUNICIPALITIES';

export const SET_DESTINATION_MUNICIPALITY = 'SET_DESTINATION_MUNICIPALITY';
const DESTINATION_MUNICIPALITY_SET = 'DESTINATION_MUNICIPALITY_SET';

export const GET_AIRPORTS_FOR_DESTINATION_MUNICIPALITY = 'GET_AIRPORTS_FOR_DESTINATION_MUNICIPALITY';
const AIRPORTS_FOR_DESTINATION_MUNICIPALITY_RETRIEVED = 'AIRPORTS_FOR_DESTINATION_MUNICIPALITY_RETRIEVED';

export const SET_DESTINATION_AIRPORT = 'SET_DESTINATION_AIRPORT';
const DESTINATION_AIRPORT_SET = 'DESTINATION_AIRPORT_SET';

export const GET_FLIGHT_AIRLINES = 'GET_FLIGHT_AIRLINES';
const FLIGHT_AIRLINES_RETRIEVED = 'FLIGHT_AIRLINES_RETRIEVED';

export const CLEAR_DEPARTURE_AIRPORT_SELECTIONS = 'CLEAR_DEPARTURE_AIRPORT_SELECTIONS';
const DEPARTURE_AIRPORT_SELECTIONS_CLEARED = 'DEPARTURE_AIRPORT_SELECTIONS_CLEARED';

export const CLEAR_DESTINATION_AIRPORT_SELECTIONS = 'CLEAR_DESTINATION_AIRPORT_SELECTIONS';
const DESTINATION_AIRPORTS_SELECTION_CLEARED = 'DESTINATION_AIRPORTS_SELECTION_CLEARED';

export const CLEAR_AIRLINE_SELECTION = 'CLEAR_AIRLINE_SELECTION';
const AIRLINE_SELECTION_CLEARED = 'AIRLINE_SELECTION_CLEARED';

let allFlights = new FlightCollection();

const flightsModule = {
  state: {
    all: allFlights,
    currentFlightOrder: 1,
  },
  actions: {
    [UPDATE_FLIGHT]({ commit, dispatch }, payload) {
      commit(FLIGHT_UPDATED, payload);

      if (payload.field === 'destinationAirport') {
        dispatch(GET_FLIGHT_AIRLINES);
      }
    },
    [SET_CURRENT_FLIGHT_ORDER]({ commit }, payload) {
      commit(CURRENT_FLIGHT_ORDER_SET, payload);
    },
    [ADD_FLIGHT]({ commit }) {
      commit(FLIGHT_ADDED);
    },
    [GET_DEPARTURE_MUNICIPALITIES]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        window.Vue.$http
              .get(API_END_POINTS.MUNICIPALITIES.INDEX.replace('?q', `?name=${payload.query}`))
              .then(
                response => resolve(MunicipalityListItem.createListFromBackendModel(response.data.data)),
                response => reject(JSON.parse(response.bodyText).error),
              );
      });
    },
    [SET_DEPARTURE_MUNICIPALITY]({ commit, dispatch }, payload) {
      commit(DEPARTURE_MUNICIPALITY_SET, { municipality: payload.municipality });

      dispatch(GET_AIRPORTS_FOR_DEPARTURE_MUNICIPALITY, payload);
    },
    [GET_AIRPORTS_FOR_DEPARTURE_MUNICIPALITY]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        window.Vue.$http
              .get(API_END_POINTS.AIRPORTS.INDEX.replace('?q', `?municipality=${payload.municipality}`))
              .then(
                (response) => {
                  commit(AIRPORTS_FOR_DEPARTURE_MUNICIPALITY_RETRIEVED, {
                    airports: AirportListItem.createListFromBackendModel(response.data.data),
                  });

                  resolve();
                },
                response => reject(JSON.parse(response.bodyText).error),
              );
      });
    },
    [SET_DEPARTURE_AIRPORT]({ commit }, payload) {
      commit(DEPARTURE_AIRPORT_SET, payload);
    },
    [GET_DESTINATION_MUNICIPALITIES]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        window.Vue.$http
              .get(API_END_POINTS.MUNICIPALITIES.INDEX.replace('?q', `?name=${payload.query}`))
              .then(
                response => resolve(MunicipalityListItem.createListFromBackendModel(response.data.data)),
                response => reject(JSON.parse(response.bodyText).error));
      });
    },
    [SET_DESTINATION_MUNICIPALITY]({ commit, dispatch }, payload) {
      commit(DESTINATION_MUNICIPALITY_SET, { municipality: payload.municipality });

      dispatch(GET_AIRPORTS_FOR_DESTINATION_MUNICIPALITY, payload);
    },
    [GET_AIRPORTS_FOR_DESTINATION_MUNICIPALITY]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        if (payload.municipality.length === 0) {
          reject();
        }

        window.Vue.$http
              .get(API_END_POINTS.AIRPORTS.INDEX.replace('?q', `?municipality=${payload.municipality}`))
              .then(
                (response) => {
                  commit(AIRPORTS_FOR_DESTINATION_MUNICIPALITY_RETRIEVED, {
                    airports: AirportListItem.createListFromBackendModel(response.data.data),
                  });

                  resolve();
                },
                response => reject(JSON.parse(response.bodyText).error),
              );
      });
    },
    [SET_DESTINATION_AIRPORT]({ commit }, payload) {
      commit(DESTINATION_AIRPORT_SET, payload);
    },
    [GET_FLIGHT_AIRLINES]({ commit, dispatch, state }) {
      // eslint-disable-next-line
      console.log({
        departureAirport: state.all.getFlight(state.currentFlightOrder).departureAirport,
        destinationAirport: state.all.getFlight(state.currentFlightOrder).destinationAirport,
      });

      return new Promise((resolve, reject) => {
        if (typeof state.all.getFlight(state.currentFlightOrder).departureAirport === 'undefined'
          || typeof state.all.getFlight(state.currentFlightOrder).destinationAirport === 'undefined') {
          // eslint-disable-next-line
          console.log('rejected');

          reject();
        }

        window.Vue.$http
              .get(API_END_POINTS
                .AIRLINES_FOR_FLIGHT_ROUTE.INDEX
                .replace(':departureAirportId', `${state.all.getFlight(state.currentFlightOrder)
                  .departureAirport.id}`)
                .replace(':destinationAirportId',
                  `${state.all.getFlight(state.currentFlightOrder).destinationAirport.id}`))
              .then(
                (response) => {
                  resolve();

                  commit(FLIGHT_AIRLINES_RETRIEVED, AirlineListItem.createListFromBackendModel(response.data.data));
                },
                (response) => {
                  dispatch(CLEAR_AIRLINE_SELECTION);

                  reject(JSON.parse(response.bodyText).error);
                });
      });
    },
    [CLEAR_DEPARTURE_AIRPORT_SELECTIONS]({ commit }) {
      commit(DEPARTURE_AIRPORT_SELECTIONS_CLEARED);

      commit(DESTINATION_AIRPORTS_SELECTION_CLEARED);

      commit(AIRLINE_SELECTION_CLEARED);
    },
    [CLEAR_DESTINATION_AIRPORT_SELECTIONS]({ commit }) {
      commit(DESTINATION_AIRPORTS_SELECTION_CLEARED);

      commit(AIRLINE_SELECTION_CLEARED);
    },
    [CLEAR_AIRLINE_SELECTION]({ commit }) {
      commit(AIRLINE_SELECTION_CLEARED);
    },
    [INITIALIZE_FLIGHT_STATE]({ commit }) {
      commit(FLIGHT_STATE_INITIALIZED);
    },
  },
  mutations: {
    [FLIGHT_UPDATED](state, payload) {
      if (payload.field === 'isInitial' || payload.field === 'flightOrder') {
        return;
      }

      state.all.getFlight(state.currentFlightOrder)[payload.field] = payload.value;
    },
    [CURRENT_FLIGHT_ORDER_SET](state, payload) {
      state.currentFlightOrder = payload.currentFlightOrder;
    },
    [FLIGHT_ADDED](state) {
      state.all.addFlight();
    },
    [DEPARTURE_MUNICIPALITY_SET](state, payload) {
      state.all.getFlight(state.currentFlightOrder).departureMunicipality = payload.municipality;
    },
    [AIRPORTS_FOR_DEPARTURE_MUNICIPALITY_RETRIEVED](state, payload) {
      state.all.getFlight(state.currentFlightOrder).departureAirports = payload.airports;
    },
    [DEPARTURE_AIRPORT_SET](state, payload) {
      state.all.getFlight(state.currentFlightOrder).departureAirport = payload.departureAirport;
    },
    [DESTINATION_MUNICIPALITY_SET](state, payload) {
      state.all.getFlight(state.currentFlightOrder).destinationMunicipality = payload.municipality;
    },
    [AIRPORTS_FOR_DESTINATION_MUNICIPALITY_RETRIEVED](state, payload) {
      state.all.getFlight(state.currentFlightOrder).destinationAirports = payload.airports;
    },
    [DESTINATION_AIRPORT_SET](state, payload) {
      state.all.getFlight(state.currentFlightOrder).destinationAirport = payload.destinationAirport;
    },
    [FLIGHT_AIRLINES_RETRIEVED](state, payload) {
      state.all.getFlight(state.currentFlightOrder).airlines = [];

      payload.map(airline => state.all.getFlight(state.currentFlightOrder).airlines.push(airline));
    },
    [DEPARTURE_AIRPORT_SELECTIONS_CLEARED](state) {
      state.all.getFlight(state.currentFlightOrder).departureAirports = [];
      state.all.getFlight(state.currentFlightOrder).departureAirport = new AirportListItem();
      state.all.getFlight(state.currentFlightOrder).airlines = [];
    },
    [DESTINATION_AIRPORTS_SELECTION_CLEARED](state) {
      state.all.getFlight(state.currentFlightOrder).destinationMunicipality = '';
      state.all.getFlight(state.currentFlightOrder).destinationAirports = [];
      state.all.getFlight(
        state.currentFlightOrder).destinationAirport = new AirportListItem();
      state.all.getFlight(state.currentFlightOrder).airlines = [];
    },
    [AIRLINE_SELECTION_CLEARED](state) {
      state.all.getFlight(state.currentFlightOrder).airlines = [];
      state.all.getFlight(state.currentFlightOrder).airline = new AirlineListItem();
    },
    [FLIGHT_STATE_INITIALIZED](state) {
      allFlights = new FlightCollection();

      const initialFlight = allFlights.getInitialFlight();

      state.all = allFlights;
      state.currentFlightOrder = initialFlight.flightOrder;
    },
  },
};

export default flightsModule;
