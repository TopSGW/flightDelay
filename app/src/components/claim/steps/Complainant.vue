<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12>
        <v-select id="salutation"
                  name="salutation"
                  ref="salutation"
                  :label="$t('claimform.salutation')"
                  :items="salutations"
                  :value="salutation.id"
                  itemValue="id"
                  itemText="name"
                  required
                  :rules="validation.fields.salutation.rules"
                  @input="update('salutation', $event)"
                  @blur.native="touch('salutation', $event.target.value, 'blur')"
                  :prepend-icon="indent ? 'person' : ''">
        </v-select>
      </v-flex>

      <v-flex xs12 md6 :class="{indent: indent}">
        <v-text-field id="lastName"
                      name="lastName"
                      ref="lastName"
                      :label="$t('claimform.last-name')"
                      :value.trim="lastName"
                      :hint="$t('claimform.enter-last-name')"
                      required
                      :rules="validation.fields.lastName.rules"
                      @input="update('lastName', $event)"
                      @focus="touch('lastName', $event.target.value, 'focus')">
        </v-text-field>
      </v-flex>

      <v-flex xs12 md6>
        <v-text-field id="firstName"
                      name="firstName"
                      ref="firstName"
                      :label="$t('claimform.first-name')"
                      :value.trim="firstName"
                      :hint="$t('claimform.enter-first-name')"
                      required
                      :rules="validation.fields.firstName.rules"
                      @input="update('firstName', $event)"
                      @focus="touch('firstName', $event.target.value, 'focus')">
        </v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-text-field id="street"
                      name="street"
                      ref="street"
                      :label="$t('claimform.street')"
                      :value.trim="street"
                      :hint="$t('claimform.enter-street')"
                      required
                      :rules="validation.fields.street.rules"
                      @input="update('street', $event)"
                      @focus="touch('street', $event.target.value, 'focus')"
                      :prepend-icon="indent ? 'home' : ''">
        </v-text-field>
      </v-flex>

      <v-flex xs12 md3>
        <v-text-field id="houseNumber"
                      name="houseNumber"
                      ref="houseNumber"
                      :label="$t('claimform.house-number')"
                      :value.trim="houseNumber"
                      :hint="$t('claimform.house-number')"
                      required
                      :rules="validation.fields.houseNumber.rules"
                      @input="update('houseNumber', $event)"
                      @focus="touch('houseNumber', $event.target.value, 'focus')">
        </v-text-field>
      </v-flex>

      <v-flex xs12 md3>
        <v-text-field id="boxNumber"
                      name="boxNumber"
                      :label="$t('claimform.box-number')"
                      :value.trim="boxNumber"
                      :hint="$t('claimform.box-number')"
                      @input="update('boxNumber', $event)">
        </v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 md4 :class="{indent: indent}">
        <v-text-field id="postalCode"
                      name="postalCode"
                      ref="postalCode"
                      :label="$t('claimform.postal-code')"
                      :value.trim="postalCode"
                      :hint="$t('claimform.enter-postal-code')"
                      required
                      :rules="validation.fields.postalCode.rules"
                      @input="update('postalCode', $event)"
                      @focus="touch('postalCode', $event.target.value, 'focus')">
        </v-text-field>
      </v-flex>

      <v-flex xs12 md8>
        <v-text-field id="city"
                      name="city"
                      ref="city"
                      :label="$t('claimform.city')"
                      :value.trim="city"
                      :hint="$t('claimform.enter-city')"
                      required
                      :rules="validation.fields.city.rules"
                      @input="update('city', $event)"
                      @focus="touch('city', $event.target.value, 'focus')">
        </v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 :class="{indent: indent}">
        <type-ahead id="country"
                    name="country"
                    ref="country"
                    :value="country.name"
                    :label="$t('claimform.country')"
                    :hint="$t('claimform.enter-country')"
                    :is-required="false"
                    :validation="validation.fields.country"
                    @fetchData="fetchCountries"
                    @itemSelected="countrySelected">
        </type-ahead>
      </v-flex>
    </v-layout>

    <v-text-field id="email"
                  name="email"
                  ref="email"
                  :label="$t('claimform.email')"
                  :value.trim="email"
                  :hint="$t('claimform.enter-email')"
                  required
                  :rules="validation.fields.email.rules"
                  @input="update('email', $event)"
                  @focus="touch('email', $event.target.value, 'focus')"
                  :prepend-icon="indent ? 'email' : ''">
    </v-text-field>

    <v-text-field id="phoneNumber"
                  name="phoneNumber"
                  ref="phoneNumber"
                  :label="$t('claimform.phone')"
                  :value.trim="phoneNumber"
                  :hint="$t('claimform.enter-phone')"
                  required
                  :rules="validation.fields.phoneNumber.rules"
                  @input="update('phoneNumber', $event)"
                  @focus="touch('phoneNumber', $event.target.value, 'focus')"
                  :prepend-icon="indent ? 'phone' : ''">
    </v-text-field>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import TypeAhead from '@/components/TypeAhead';
  import {
    GET_COUNTRIES,
    LOAD_SALUTATIONS,
    SET_COUNTRY,
    UPDATE_COMPLAINANT,
  } from '../../../store/claim-form/complainant/index';
  import SalutationListItem from '../../../models/list-items/salutation.list-item.model';
  import Validation from '../../../validation/validation.mixin';

  const BREAKPOINT_MD = 1024;

  export default {
    name: 'complainant',
    components: { TypeAhead },
    mixins: [Validation],
    data() {
      return {
        indent: false,
        validation: {
          fields: {
            salutation: {
              rules: [
                (value, shouldBeDirty) => this.required(
                  'salutation',
                  window.Vue.$t('claimform.salutation'),
                  value,
                  shouldBeDirty,
                ),
              ],
              dirty: false,
              isSelectField: true,
            },
            lastName: {
              rules: [
                (value, shouldBeDirty) => this.required(
                  'lastName',
                  window.Vue.$t('claimform.last-name'),
                  value,
                  shouldBeDirty,
                ),
                (value, shouldBeDirty) => this.validString(
                  'lastName',
                  window.Vue.$t('claimform.last-name'),
                  value,
                  shouldBeDirty,
                ),
              ],
              dirty: false,
              isSelectField: false,
            },
            firstName: {
              rules: [
                (value, shouldBeDirty) => this.required(
                  'firstName',
                  value,
                  window.Vue.$t('claimform.first-name'),
                  shouldBeDirty,
                ),
                (value, shouldBeDirty) => this.validString(
                  'firstName',
                  window.Vue.$t('claimform.first-name'),
                  value,
                  shouldBeDirty,
                ),
              ],
              dirty: false,
              isSelectField: false,
            },
            street: {
              rules: [
                (value, shouldBeDirty) => this.required(
                  'street',
                  window.Vue.$t('claimform.street'),
                  value,
                  shouldBeDirty,
                ),
                (value, shouldBeDirty) => this.validString(
                  'street',
                  window.Vue.$t('claimform.street'),
                  value,
                  shouldBeDirty,
                ),
              ],
              dirty: false,
              isSelectField: false,
            },
            houseNumber: {
              rules: [
                (value, shouldBeDirty) => this.required(
                  'houseNumber',
                  window.Vue.$t('claimform.house-number'),
                  value,
                  shouldBeDirty,
                ),
                (value, shouldBeDirty) => this.alphaNum(
                  'houseNumber',
                  window.Vue.$t('claimform.house-number'),
                  value,
                  shouldBeDirty,
                ),
              ],
              dirty: false,
              isSelectField: false,
            },
            postalCode: {
              rules: [
                (value, shouldBeDirty) => this.required(
                  'postalCode',
                  window.Vue.$t('claimform.postal-code'),
                  value,
                  shouldBeDirty,
                ),
                (value, shouldBeDirty) => this.alphaDash(
                  'postalCode',
                  window.Vue.$t('claimform.postal-code'),
                  value,
                  shouldBeDirty,
                ),
              ],
              dirty: false,
              isSelectField: false,
            },
            city: {
              rules: [
                (value, shouldBeDirty) => this.required(
                  'city',
                  window.Vue.$t('claimform.enter-city'),
                  value,
                  shouldBeDirty,
                ),
                (value, shouldBeDirty) => this.validString(
                  'city',
                  window.Vue.$t('claimform.enter-city'),
                  value,
                  shouldBeDirty,
                ),
              ],
              dirty: false,
              isSelectField: false,
            },
            country: {
              rules: [],
              dirty: false,
              isSelectField: true,
            },
            email: {
              rules: [
                (value, shouldBeDirty) => this.required(
                  'email',
                  window.Vue.$t('claimform.enter-email'),
                  value,
                  shouldBeDirty,
                ),
                (value, shouldBeDirty) => this.validEmail(
                  'email',
                  window.Vue.$t('claimform.enter-email'),
                  value,
                  shouldBeDirty,
                ),
              ],
              dirty: false,
              isSelectField: false,
            },
            phoneNumber: {
              rules: [
                (value, shouldBeDirty) => this.required(
                  'phoneNumber',
                  window.Vue.$t('claimform.phone'),
                  value,
                  shouldBeDirty,
                ),
                (value, shouldBeDirty) => this.validPhoneNumber(
                  'phoneNumber',
                  window.Vue.$t('claimform.phone'),
                  value,
                  shouldBeDirty,
                ),
              ],
              dirty: false,
              isSelectField: false,
            },
          },
          selectFields: ['salutation'],
        },
      };
    },
    created() {
      this.$store.dispatch(LOAD_SALUTATIONS);
    },
    mounted() {
      window.addEventListener('resize', this.onWindowResize);

      this.onWindowResize();
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onWindowResize);
    },
    computed: {
      width: () => window.width,
      ...mapState({
        salutations: state => SalutationListItem.translate(state.claimForm.complainant.salutations),
        salutation: state => state.claimForm.complainant.salutation,
        lastName: state => state.claimForm.complainant.lastName,
        firstName: state => state.claimForm.complainant.firstName,
        street: state => state.claimForm.complainant.street,
        houseNumber: state => state.claimForm.complainant.houseNumber,
        boxNumber: state => state.claimForm.complainant.boxNumber,
        postalCode: state => state.claimForm.complainant.postalCode,
        city: state => state.claimForm.complainant.city,
        country: state => state.claimForm.complainant.country,
        email: state => state.claimForm.complainant.email,
        gsmNumber: state => state.claimForm.complainant.gsmNumber,
        phoneNumber: state => state.claimForm.complainant.phoneNumber,

      }),
    },
    methods: {
      onWindowResize() {
        this.indent = (window.innerWidth > BREAKPOINT_MD);
      },
      // eslint-disable-next-line
      update(field, e) {
        let value = null;

        // eslint-disable-next-line
        console.info({ method: 'update', field, e });

        this.touch(field, e, 'update');

        switch (field) {
          case 'salutation':
            value = this.salutations.find(salutation => salutation.id === parseInt(e, 10));

            if (typeof value === 'undefined') {
              value = new SalutationListItem();
            }

            break;
          default:
            value = e;
        }

        this.$store.dispatch(UPDATE_COMPLAINANT, { field, value });
      },
      fetchCountries(query) {
        this.$store
          .dispatch(GET_COUNTRIES, { query })
          .then(listItems => this.$refs.country.setListItems(listItems))
          .catch((error) => {
            if (error.status_code === 404) {
              // eslint-disable-next-line
              console.log(error.message);
            }
          });
      },
      countrySelected(selectedItem) {
        if (selectedItem.name.length === 0) {
          return;
        }

        this.$store
          .dispatch(SET_COUNTRY, { country: selectedItem })
          .catch((error) => {
            if (error.status_code === 404) {
              // eslint-disable-next-line
              console.log(error.message);
            }
          });
      },
    },
  };
</script>

<style lang="scss" scoped>
  div.indent {
    padding-left: 45px;
  }

  div.indent-xs {
    padding-left: 40px;

    label {
      left: 40px
    }
  }
</style>
