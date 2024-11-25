<template>
  <div>
    <h1>{{ $t('navigation.contact') }}</h1>

    <contact-en v-if="$i18n.locale() === 'en'"></contact-en>
    <contact-fr v-if="$i18n.locale() === 'fr'"></contact-fr>
    <contact-nl v-if="$i18n.locale() === 'nl'"></contact-nl>

    <contact-form></contact-form>
  </div>
</template>

<script>
  import ContactEn from '@/components/static-pages/contact/en';
  import ContactFr from '@/components/static-pages/contact/fr';
  import ContactNl from '@/components/static-pages/contact/nl';
  import ContactForm from '@/components/contact/ContactForm';

  export default {
    name: 'contact',
    components: { ContactEn, ContactFr, ContactNl, ContactForm },
    data() {
      return {};
    },
    mounted() {
      document.body.scrollTop = 0;
    },
  };
</script>
