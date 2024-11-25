<template>
  <div>
    <h1>{{ $t('navigation.terms-and-conditions') }}</h1>

    <terms-and-conditions-en v-if="$i18n.locale() == 'en'"></terms-and-conditions-en>
    <terms-and-conditions-fr v-if="$i18n.locale() == 'fr'"></terms-and-conditions-fr>
    <terms-and-conditions-nl v-if="$i18n.locale() == 'nl'"></terms-and-conditions-nl>
  </div>
</template>

<script>
  import TermsAndConditionsEn from '@/components/static-pages/terms-and-conditions/en';
  import TermsAndConditionsFr from '@/components/static-pages/terms-and-conditions/fr';
  import TermsAndConditionsNl from '@/components/static-pages/terms-and-conditions/nl';

  export default {
    components: { TermsAndConditionsEn, TermsAndConditionsFr, TermsAndConditionsNl },
    name: 'terms-and-conditions',
    data() {
      return {};
    },
    mounted() {
      document.body.scrollTop = 0;
    },
  };
</script>
