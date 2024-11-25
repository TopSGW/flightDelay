<template>
  <div>
    <home-en v-if="$i18n.locale() == 'en'"></home-en>
    <home-fr v-if="$i18n.locale() == 'fr'"></home-fr>
    <home-nl v-if="$i18n.locale() == 'nl'"></home-nl>
  </div>
</template>

<script>
  import HomeEn from '@/components/static-pages/home/en';
  import HomeFr from '@/components/static-pages/home/fr';
  import HomeNl from '@/components/static-pages/home/nl';

  export default {
    name: 'home',
    components: { HomeEn, HomeFr, HomeNl },
    data() {
      return {};
    },
    mounted() {
      document.body.scrollTop = 0;
    },
  };
</script>
