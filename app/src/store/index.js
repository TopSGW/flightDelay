import Vuex from 'vuex';
import Vue from 'vue';
import vuexI18n from 'vuex-i18n';
import claimFormModule from './claim-form';
import contactFormModule from './contact-form';
import recaptchaModule from './recaptcha';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store,
    claimForm: claimFormModule,
    contactForm: contactFormModule,
    recaptcha: recaptchaModule,
  },
});

export default store;
