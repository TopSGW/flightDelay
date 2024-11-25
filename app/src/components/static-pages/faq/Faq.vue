<template>
  <div>
    <h1>{{ $t('navigation.faq') }}</h1>

    <faq-en v-if="$i18n.locale() == 'en'"></faq-en>
    <faq-fr v-if="$i18n.locale() == 'fr'"></faq-fr>
    <faq-nl v-if="$i18n.locale() == 'nl'"></faq-nl>
  </div>
</template>

<script>
  import FaqEn from '@/components/static-pages/faq/en';
  import FaqFr from '@/components/static-pages/faq/fr';
  import FaqNl from '@/components/static-pages/faq/nl';

  export default {
    name: 'faq',
    components: { FaqEn, FaqFr, FaqNl },
    data() {
      return {};
    },
    mounted() {
      document.body.scrollTop = 0;
    },
  };
</script>
