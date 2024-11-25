// eslint-disable-next-line
/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */

import API_END_POINTS from '../../../services/api-endpoints';
import Complainant from '../../../models/complainant.model';
import CountryListItem from '../../../models/list-items/country.list-item.model';
import SalutationListItem from '../../../models/list-items/salutation.list-item.model';

export const LOAD_SALUTATIONS = 'LOAD_SALUTATIONS';
const SALUTATIONS_LOADED = 'SALUTATIONS_LOADED';

export const UPDATE_COMPLAINANT = 'UPDATE_COMPLAINANT';
const COMPLAINANT_UPDATED = 'COMPLAINANT_UPDATED';

export const INITIALIZE_COMPLAINANT_STATE = 'INITIALIZE_COMPLAINANT_STATE';
const COMPLAINANT_STATE_INITIALIZED = 'COMPLAINANT_STATE_INITIALIZED';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const CLEAR_COUNTRIES = 'CLEAR_COUNTRIES';
export const SET_COUNTRY = 'SET_COUNTRY';
export const CLEAR_SELECTED_COUNTRY = 'CLEAR_SELECTED_COUNTRY';
const COUNTRIES_RETRIEVED = 'COUNTRIES_RETRIEVED';
const COUNTRIES_CLEARED = 'COUNTRIES_CLEARED';
const COUNTRY_WAS_SET = 'COUNTRY_WAS_SET';
const COUNTRY_WAS_CLEARED = 'COUNTRY_WAS_CLEARED';

const complainantModule = {
  state: new Complainant(),
  actions: {
    [LOAD_SALUTATIONS]({ commit }) {
      window.Vue.$http
            .get(API_END_POINTS.SALUTATIONS.LOAD)
            .then(response => commit(
              SALUTATIONS_LOADED,
              SalutationListItem.createListFromBackendModel(response.data.data)));
    },
    [UPDATE_COMPLAINANT]({ commit }, payload) {
      commit(COMPLAINANT_UPDATED, payload);
    },
    [GET_COUNTRIES]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        window.Vue.$http
              .get(API_END_POINTS.COUNTRIES.INDEX.replace('?q', `?name=${payload.query}`))
              .then(
                (response) => {
                  const countries = CountryListItem.createListFromBackendModel(response.data.data);

                  commit(COUNTRIES_RETRIEVED, { countries });

                  resolve(countries);
                },
                response => reject(JSON.parse(response.bodyText).error),
              );
      });
    },
    [CLEAR_COUNTRIES]({ commit }) {
      commit(COUNTRIES_CLEARED);
    },
    [SET_COUNTRY]({ commit }, payload) {
      commit(COUNTRY_WAS_SET, payload);
    },
    [CLEAR_SELECTED_COUNTRY]({ commit }) {
      commit(COUNTRY_WAS_CLEARED);
    },
    [INITIALIZE_COMPLAINANT_STATE]({ commit }) {
      commit(COMPLAINANT_STATE_INITIALIZED);
    },
  },
  mutations: {
    [SALUTATIONS_LOADED](state, payload) {
      state.salutations = payload;
    },
    [COMPLAINANT_UPDATED](state, payload) {
      state[payload.field] = payload.value;
    },
    [COUNTRIES_RETRIEVED](state, payload) {
      state.countries = payload.countries;
    },
    [COUNTRIES_CLEARED](state) {
      state.countries = [];
    },
    [COUNTRY_WAS_SET](state, payload) {
      state.country = payload.country;
    },
    [COUNTRY_WAS_CLEARED](state) {
      state.country = new CountryListItem();
    },
    [COMPLAINANT_STATE_INITIALIZED](state) {
      state.salutation = new SalutationListItem();
      state.country = new CountryListItem();
      state.countries = [];
      state.language = '';
      state.lastName = '';
      state.firstName = '';
      state.street = '';
      state.houseNumber = '';
      state.boxNumber = '';
      state.postalCode = '';
      state.city = '';
      state.email = '';
      state.phoneNumber = '';
    },
  },
};

export default complainantModule;
