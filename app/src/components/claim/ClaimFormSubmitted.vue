<template>
  <div>
    <p class="display-1">{{ $t('claimform.submitted-succesfully-header') }}</p>
    <p class="display-1">{{ $t('claimform.submitted-succesfully-text') }}</p>
  </div>
</template>

<script>
  export default {
    name: 'claim-form-submitted',
  };
</script>

<style lang="scss">
  @import '../../sass/variables';

  p.display-1 {
    color: $color-main-middle;
  }
</style>
