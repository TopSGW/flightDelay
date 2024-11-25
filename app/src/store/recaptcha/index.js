// eslint-disable-next-line
/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */

const DEBUG_MODE = process.env.DEBUG_MODE;

export const ADD_RECAPTCHA_RESPONSE = 'ADD_RECAPTCHA_RESPONSE';

const RESPONSE_ADDED = 'RESPONSE_ADDED';

const contactFormModule = {
  state: {
    sitekey: DEBUG_MODE === true
      ? '6LeTxyIUAAAAAE-Uc-xD9_A3fxcamPD53ezHRNtn'
      : '6LdnDS8UAAAAAJwor_mOkaEvJ5cP8sxVxpOxUoGm',
    response: '',
  },
  actions: {
    [ADD_RECAPTCHA_RESPONSE]({ commit }, payload) {
      commit(RESPONSE_ADDED, { response: payload.response });
    },
  },
  mutations: {
    [RESPONSE_ADDED](state, payload) {
      state.response = payload.response;
    },
  },
};

export default contactFormModule;
