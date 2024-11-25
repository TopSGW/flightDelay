import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/static-pages/home/Home';
import ModeOfOperation from '@/components/static-pages/mode-of-operation/ModeOfOperation';
import YourRights from '@/components/static-pages/your-rights/YourRights';
import Faq from '@/components/static-pages/faq/Faq';
import Contact from '@/components/static-pages/contact/Contact';
import TermsAndConditions from '@/components/static-pages/terms-and-conditions/TermsAndConditions';
import AboutUs from '@/components/static-pages/about-us/AboutUs';
import ClaimForm from '@/components/claim/ClaimForm';
import ClaimFormSubmitted from '@/components/claim/ClaimFormSubmitted';
import ContactFormSubmitted from '@/components/contact/ContactFormSubmitted';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/claim',
      name: 'claim',
      component: ClaimForm,
    },
    {
      path: '/claim-submitted',
      name: 'claim-submitted',
      component: ClaimFormSubmitted,
    },
    {
      path: '/mode-of-operation',
      name: 'mode-of-operation',
      component: ModeOfOperation,
    },
    {
      path: '/your-rights',
      name: 'your-rights',
      component: YourRights,
    },
    {
      path: '/faq',
      name: 'faq',
      component: Faq,
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
    {
      path: '/contact-request-submitted',
      name: 'contact-form-submitted',
      component: ContactFormSubmitted,
    },
    {
      path: '/terms-and-conditions',
      name: 'terms-and-conditions',
      component: TermsAndConditions,
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: AboutUs,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
});
