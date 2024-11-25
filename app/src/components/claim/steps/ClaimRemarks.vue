<template>
  <v-text-field id="remarks"
                name="remarks"
                :label="$t('claimform.add-remarks')"
                :value.trim="remarks"
                :hint="$t('claimform.enter-add-remarks')"
                @input="update('remarks', $event)"
                multiLine>
  </v-text-field>
</template>

<script>
  import { mapState } from 'vuex';
  import { UPDATE_CLAIM_FIELD } from '../../../store/claim-form/index';
  import Validation from '../../../validation/validation.mixin';

  export default {
    name: 'claim-remarks',
    mixins: [Validation],
    data() {
      return {
        validation: {},
      };
    },
    computed: {
      ...mapState({
        remarks: state => state.claimForm.remarks,
      }),
    },
    methods: {
      // eslint-disable-next-line
      update(field, e) {
        this.$store.dispatch(UPDATE_CLAIM_FIELD, { field, value: e.trim() });
      },
    },
  };
</script>
