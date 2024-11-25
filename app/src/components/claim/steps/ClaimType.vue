<template>
  <v-select id="claimType"
            name="claimType"
            ref="claimType"
            :label="$t('claimform.type-of-claim')"
            :items="claimTypes"
            :value="claimType.id"
            itemValue="id"
            itemText="name"
            :rules="validation.fields.claimType.rules"
            @input="update('claimType', $event)"
            @focus.native="touch('claimType', $event.target.value, 'focus')"
            required>
  </v-select>
</template>

<script>
  import { mapState } from 'vuex';
  import { UPDATE_CLAIM_FIELD } from '../../../store/claim-form/index';
  import ClaimTypeListItem from '../../../models/list-items/claim-type.list-item.model';
  import Validation from '../../../validation/validation.mixin';

  export default {
    name: 'claim-type',
    mixins: [Validation],
    data() {
      return {
        validation: {
          fields: {
            claimType: {
              rules: [
                (value, shouldBeDirty) => this.required(
                  'claimType',
                  window.Vue.$t('claimform.type-of-claim'),
                  value,
                  shouldBeDirty,
                ),
              ],
              dirty: false,
              isSelectField: true,
            },
          },
          selectFields: ['claimType'],
        },
      };
    },
    computed: {
      ...mapState({
        currentStep: state => state.claimForm.currentStep,
        claimTypes: state => ClaimTypeListItem.translate(state.claimForm.claimTypes),
        claimType: state => state.claimForm.claimType,
      }),
    },
    methods: {
      update(field, e) {
        // eslint-disable-next-line
        console.info({ method: 'update', field, e });

        this.touch(field, e, 'update');

        let value = this.claimTypes.find(claimType => claimType.id === parseInt(e, 10));

        if (typeof value === 'undefined') {
          value = new ClaimTypeListItem();
        }

        this.$store.dispatch(UPDATE_CLAIM_FIELD, { field, value });
      },
    },
  };
</script>
