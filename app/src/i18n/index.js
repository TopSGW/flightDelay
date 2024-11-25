import Vue from 'vue';
import vuexI18n from 'vuex-i18n';
import store from '../store';
import translationsEn from './en';
import translationsFr from './fr';
import translationsNl from './nl';

window.moment = require('moment');

Vue.use(vuexI18n.plugin, store);

Vue.i18n.add('en', translationsEn);
Vue.i18n.add('nl', translationsNl);
Vue.i18n.add('fr', translationsFr);

const supportedLocales = ['en', 'fr', 'nl'];
let currentLocale = 'nl';

supportedLocales.forEach((locale) => {
  if (locale === window.navigator.language.substr(0, 2)) {
    currentLocale = locale;
  }
});

Vue.i18n.set(currentLocale);
Vue.i18n.fallback('en');

window.moment.locale(currentLocale);
