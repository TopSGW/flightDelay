<template>
  <div>
    <h1>{{ $t('navigation.mode-of-operation') }}</h1>

    <mode-of-operation-en v-if="$i18n.locale() == 'en'"></mode-of-operation-en>
    <mode-of-operation-fr v-if="$i18n.locale() == 'fr'"></mode-of-operation-fr>
    <mode-of-operation-nl v-if="$i18n.locale() == 'nl'"></mode-of-operation-nl>
  </div>
</template>

<script>
  import ModeOfOperationEn from '@/components/static-pages/mode-of-operation/en';
  import ModeOfOperationFr from '@/components/static-pages/mode-of-operation/fr';
  import ModeOfOperationNl from '@/components/static-pages/mode-of-operation/nl';

  export default {
    components: { ModeOfOperationEn, ModeOfOperationFr, ModeOfOperationNl },
    name: 'mode-of-operation',
    data() {
      return {};
    },
    mounted() {
      document.body.scrollTop = 0;
    },
  };
</script>
