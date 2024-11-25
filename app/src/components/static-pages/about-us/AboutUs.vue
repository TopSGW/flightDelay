<template>
  <div>
    <h1>{{ $t('navigation.about-us') }}</h1>

    <about-us-en v-if="$i18n.locale() === 'en'"></about-us-en>
    <about-us-fr v-if="$i18n.locale() === 'fr'"></about-us-fr>
    <about-us-nl v-if="$i18n.locale() === 'nl'"></about-us-nl>
  </div>
</template>

<script>
  import AboutUsEn from '@/components/static-pages/about-us/en';
  import AboutUsFr from '@/components/static-pages/about-us/fr';
  import AboutUsNl from '@/components/static-pages/about-us/nl';

  export default {
    name: 'about-us',
    components: { AboutUsEn, AboutUsFr, AboutUsNl },
    data() {
      return {};
    },
    mounted() {
      document.body.scrollTop = 0;
    },
  };
</script>
