// eslint-disable-next-line
/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */

import Contact from '../../models/contact.model';
import API_END_POINTS from '../../services/api-endpoints';
import ApiResult from '../../models/api-result.model';

export const UPDATE_CONTACT_FIELD = 'UPDATE_CONTACT_FIELD';
const CONTACT_FIELD_WAS_UPDATED = 'CONTACT_FIELD_WAS_UPDATED';

export const SEND_CONTACT_REQUEST = 'SEND_CONTACT_REQUEST';
const CONTACT_REQUEST_WAS_SENT = 'CONTACT_REQUEST_WAS_SENT';

const CONTACT_SUBMISSION_SUCCEEDED = 'CONTACT_SUBMISSION_SUCCEEDED';
const CONTACT_SUBMISSION_FAILED = 'CONTACT_SUBMISSION_FAILED';
const CONTACT_STATUS_RESET = 'CONTACT_STATUS_RESET';

const contactFormModule = {
  state: new Contact(),
  actions: {
    [UPDATE_CONTACT_FIELD]({ commit }, payload) {
      const value = payload.value;

      commit(CONTACT_FIELD_WAS_UPDATED, { field: payload.field, value });
    },
    [SEND_CONTACT_REQUEST]({ commit, state }) {
      return new Promise((resolve, reject) => {
        window.Vue.$http
              .post(API_END_POINTS.CONTACT_REQUEST.SUBMIT, state)
              .then(
                () => {
                  commit(CONTACT_REQUEST_WAS_SENT);

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

                  commit(CONTACT_SUBMISSION_FAILED, { status: result });

                  reject(result);
                },
              );
      });
    },
  },
  mutations: {
    [CONTACT_FIELD_WAS_UPDATED](state, payload) {
      state[payload.field] = payload.value;
    },
    // eslint-disable-next-line
    [CONTACT_REQUEST_WAS_SENT](state) {
      // eslint-disable-next-line
      state.name = '';
      state.email = '';
      state.subject = '';
      state.message = '';
      state.status = new ApiResult();
    },
    [CONTACT_SUBMISSION_SUCCEEDED](state) {
      state.status.submitted = true;
      state.status.success = true;
    },
    [CONTACT_SUBMISSION_FAILED](state, payload) {
      state.status = payload.status;
    },
    [CONTACT_STATUS_RESET](state) {
      state.status = new ApiResult();
    },
  },
};

export default contactFormModule;
