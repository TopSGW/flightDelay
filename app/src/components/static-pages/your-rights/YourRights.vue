<template>
  <div>
    <h1>{{ $t('navigation.your-rights') }}</h1>

    <your-rights-en v-if="$i18n.locale() === 'en'"></your-rights-en>
    <your-rights-fr v-if="$i18n.locale() === 'fr'"></your-rights-fr>
    <your-rights-nl v-if="$i18n.locale() === 'nl'"></your-rights-nl>
  </div>
</template>

<script>
  import YourRightsEn from '@/components/static-pages/your-rights/en';
  import YourRightsFr from '@/components/static-pages/your-rights/fr';
  import YourRightsNl from '@/components/static-pages/your-rights/nl';

  export default {
    name: 'your-rights',
    components: { YourRightsEn, YourRightsFr, YourRightsNl },
    data() {
      return {};
    },
    mounted() {
      document.body.scrollTop = 0;
    },
  };
</script>
