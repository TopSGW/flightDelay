<template>
  <div>
    <h1>{{ $t('header.cta-button') }}</h1>

    <v-alert v-show="claim.status.submitted === true && claim.status.success === true"
             success value="true">
      {{ $t('claimform.submitted-succesfully-header') }}
    </v-alert>

    <v-alert v-show="claim.status.submitted === true && claim.status.success === false"
             error value="true">
      {{ $t(claim.status.message, { component: getTranslatedComponent(), index: claim.status.index }) }}
    </v-alert>

    <v-stepper v-model="currentStep" vertical>
      <v-stepper-step step="1" :complete="currentStep > 1">{{ $t('claimform.type-of-claim') }}</v-stepper-step>
      <v-layout v-show="currentStep > 1" class="stepper__summary">
        <v-flex xs12>{{ claim.claimType.name }}</v-flex>
      </v-layout>
      <v-stepper-content step="1">
        <section>
          <claim-type ref="claimType" :reset-validation="false"></claim-type>
        </section>

        <v-layout class="button-row" row wrap>
          <v-flex xs12>
            <v-btn @click.native="nextStep()" primary>{{ $t('claimform.next') }}</v-btn>
          </v-flex>
        </v-layout>
      </v-stepper-content>

      <v-stepper-step step="2" :complete="currentStep > 2">{{ $t('claimform.initial-flight') }}</v-stepper-step>
      <v-layout v-show="currentStep > 2" class="stepper__summary" row wrap>
        <v-flex xs12 sm5 md3><strong>{{ $t('claimform.flight-date') }}</strong></v-flex>
        <v-flex xs12 sm7 md9>{{ toDateString(initialFlight.flightDate) }}</v-flex>

        <template v-if="initialFlight.flightNumberIsKnown === true">
          <v-flex xs12 sm5 md3><strong>{{ $t('claimform.flight-number') }}</strong></v-flex>
          <v-flex xs12 sm7 md9>{{ initialFlight.flightNumber }}</v-flex>
        </template>
        <template v-else>
          <v-flex xs12 sm5 md3><strong>{{ $t('claimform.departure-airport') }}</strong></v-flex>
          <v-flex xs12 sm7 md9>{{ initialFlight.departureAirport.name }}</v-flex>

          <v-flex xs12 sm5 md3><strong>{{ $t('claimform.arrival-airport') }}</strong></v-flex>
          <v-flex xs12 sm7 md9>{{ initialFlight.destinationAirport.name }}</v-flex>

          <v-flex xs12 sm5 md3><strong>{{ $t('claimform.airline') }}</strong></v-flex>
          <v-flex xs12 sm7 md9>{{ initialFlight.airline.name }}</v-flex>
        </template>

        <v-flex xs12 sm5 md3><strong>{{ $t('claimform.delay') }}</strong></v-flex>
        <v-flex xs12 sm7 md9>{{ initialFlight.delay.name }}</v-flex>
      </v-layout>
      <v-stepper-content step="2">
        <section>
          <initial-flight ref="initialFlight"></initial-flight>
        </section>

        <v-layout class="button-row" row wrap>
          <v-flex xs12>
            <v-btn @click.native="nextStep()" primary>{{ $t('claimform.next') }}</v-btn>
            <v-btn @click.native="previousStep">{{ $t('claimform.back') }}</v-btn>
          </v-flex>
        </v-layout>
      </v-stepper-content>

      <v-stepper-step step="3" :complete="currentStep > 3">{{ $t('claimform.connecting-flight') }}</v-stepper-step>
      <v-layout v-show="currentStep > 3" class="stepper__summary" row wrap>
        <template v-if="initialFlightHasAConnectingFlight === false">
          <v-flex xs12>
            {{ $t('not applicable') }}
          </v-flex>
        </template>
        <template v-else>
          <v-flex xs12 sm5 md3><strong>{{ $t('claimform.flight-date') }}</strong></v-flex>
          <v-flex xs12 sm7 md9>{{ typeof connectingFlight === 'undefined'
            ? ''
            : toDateString(connectingFlight.flightDate) }}
          </v-flex>

          <template v-if="initialFlight.flightNumberIsKnown === true">
            <v-flex xs12 sm5 md3><strong>{{ $t('claimform.flight-number') }}</strong></v-flex>
            <v-flex xs12 sm7 md9>{{ typeof connectingFlight === 'undefined' ? '' : connectingFlight.flightNumber }}
            </v-flex>
          </template>
          <template v-else>
            <v-flex xs12 sm5 md3><strong>{{ $t('claimform.departure-airport') }}</strong></v-flex>
            <v-flex xs12 sm7 md9>{{ typeof connectingFlight === 'undefined'
              ? ''
              : connectingFlight.departureAirport.name }}
            </v-flex>

            <v-flex xs12 sm5 md3><strong>{{ $t('claimform.arrival-airport') }}</strong></v-flex>
            <v-flex xs12 sm7 md9>{{ typeof connectingFlight === 'undefined'
              ? ''
              : connectingFlight.destinationAirport.name }}
            </v-flex>

            <v-flex xs12 sm5 md3><strong>{{ $t('claimform.airline') }}</strong></v-flex>
            <v-flex xs12 sm7 md9>{{ typeof connectingFlight === 'undefined' ? '' : connectingFlight.airline.name }}
            </v-flex>
          </template>

          <v-flex xs12 sm5 md3><strong>{{ $t('claimform.delay') }}</strong></v-flex>
          <v-flex xs12 sm7 md9>{{ typeof connectingFlight === 'undefined' ? '' : connectingFlight.delay.name }}
          </v-flex>
        </template>
      </v-layout>
      <v-stepper-content step="3" v-show="initialFlightHasAConnectingFlight === true">
        <section>
          <connecting-flight ref="connectingFlight"></connecting-flight>
        </section>

        <v-layout class="button-row" row wrap>
          <v-flex xs12>
            <v-btn @click.native="nextStep()" primary>{{ $t('claimform.next') }}</v-btn>
            <v-btn @click.native="previousStep">{{ $t('claimform.back') }}</v-btn>
          </v-flex>
        </v-layout>
      </v-stepper-content>

      <v-stepper-step step="4" :complete="currentStep > 4">{{ $t('claimform.your-details') }}</v-stepper-step>
      <v-layout v-show="currentStep > 4" class="stepper__summary" row wrap>
        <v-flex xs12 sm5 md3><strong>{{ $t('claimform.last-name') }}</strong></v-flex>
        <v-flex xs12 sm7 md9>{{ claim.complainant.lastName }}</v-flex>

        <v-flex xs12 sm5 md3><strong>{{ $t('claimform.first-name') }}</strong></v-flex>
        <v-flex xs12 sm7 md9>{{ claim.complainant.firstName }}</v-flex>

        <v-flex xs12 sm5 md3><strong>{{ $t('claimform.street') }}</strong></v-flex>
        <v-flex xs12 sm7 md9>{{ claim.complainant.street }}</v-flex>

        <v-flex xs12 sm5 md3><strong>{{ $t('claimform.house-number') }}</strong></v-flex>
        <v-flex xs12 sm7 md9>{{ claim.complainant.houseNumber }}</v-flex>

        <v-flex xs12 sm5 md3><strong>{{ $t('claimform.box-number') }}</strong></v-flex>
        <v-flex xs12 sm7 md9>{{ claim.complainant.boxNumber }}</v-flex>

        <v-flex xs12 sm5 md3><strong>{{ $t('claimform.postal-code') }}</strong></v-flex>
        <v-flex xs12 sm7 md9>{{ claim.complainant.postalCode }}</v-flex>

        <v-flex xs12 sm5 md3><strong>{{ $t('claimform.city') }}</strong></v-flex>
        <v-flex xs12 sm7 md9>{{ claim.complainant.city }}</v-flex>

        <v-flex xs12 sm5 md3><strong>{{ $t('claimform.country') }}</strong></v-flex>
        <v-flex xs12 sm7 md9>{{ claim.complainant.country.name }}</v-flex>

        <v-flex xs12 sm5 md3><strong>{{ $t('claimform.email') }}</strong></v-flex>
        <v-flex xs12 sm7 md9>{{ claim.complainant.email }}</v-flex>

        <v-flex xs12 sm5 md3><strong>{{ $t('claimform.phone') }}</strong></v-flex>
        <v-flex xs12 sm7 md9>{{ claim.complainant.phoneNumber }}</v-flex>
      </v-layout>
      <v-stepper-content step="4">
        <section>
          <complainant ref="complainant"></complainant>
        </section>

        <v-layout class="button-row" row wrap>
          <v-flex xs12>
            <v-btn @click.native="nextStep()" primary>{{ $t('claimform.next') }}</v-btn>
            <v-btn @click.native="previousStep">{{ $t('claimform.back') }}</v-btn>
          </v-flex>
        </v-layout>
      </v-stepper-content>

      <v-stepper-step step="5" :complete="currentStep > 5">{{ $t('claimform.remarks') }}</v-stepper-step>
      <v-layout v-show="currentStep > 5" class="stepper__summary">
        <v-flex xs12>{{ claim.remarks }}</v-flex>
      </v-layout>
      <v-stepper-content step="5">
        <section>
          <claim-remarks ref="claimRemarks"></claim-remarks>
        </section>

        <v-layout class="button-row" row wrap>
          <v-flex xs12>
            <v-btn @click.native="nextStep()" primary>{{ $t('claimform.next') }}</v-btn>
            <v-btn @click.native="previousStep">{{ $t('claimform.back') }}</v-btn>
          </v-flex>
        </v-layout>
      </v-stepper-content>

      <v-stepper-step step="6" :complete="currentStep > 6">{{ $t('claimform.summary') }}</v-stepper-step>
      <v-stepper-content step="6">
        <v-layout row wrap>
          <v-flex xs1>
            <v-checkbox id="agreesWithGeneralTerms"
                        v-model="agreesWithGeneralTerms"
                        @change="update('agreesWithGeneralTerms', $event)">
            </v-checkbox>
          </v-flex>
          <v-flex xs11 class="checkbox-label">
            <span
              v-html="$t('claimform.agree-with-terms-and-conditions', {url: getGeneralTermsUrl()})">
            </span>
          </v-flex>
        </v-layout>

        <v-layout class="button-row" row wrap>
          <v-flex xs12>
            <invisible-recaptcha :sitekey="sitekey"
                                 :callback="nextStep"
                                 type="button"
                                 button-h-align="left"
                                 primary
                                 theme="light"
                                 :disabled="agreesWithGeneralTerms === false"
                                 id="claimFormRecaptcha">
              {{ $t('claimform.submit-claim') }}
            </invisible-recaptcha>

            <v-btn @click.native="restart()"
                   v-show="currentStep > numberOfSteps">
              {{ $t('restart') }}
            </v-btn>
            <v-btn right @click.native="previousStep">{{ $t('claimform.back') }}</v-btn>
          </v-flex>
        </v-layout>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import InvisibleRecaptcha from '@/components/InvisibleRecaptcha';
  import ClaimType from '@/components/claim/steps/ClaimType';
  import InitialFlight from '@/components/claim/steps/InitialFlight';
  import ConnectingFlight from '@/components/claim/steps/ConnectingFlight';
  import Complainant from '@/components/claim/steps/Complainant';
  import ClaimRemarks from '@/components/claim/steps/ClaimRemarks';
  import { SET_CURRENT_STEP, SUBMIT_CLAIM, UPDATE_CLAIM_FIELD } from '../../store/claim-form/index';
  import { ADD_FLIGHT, SET_CURRENT_FLIGHT_ORDER } from '../../store/claim-form/flights/index';
  import Flight from '../../models/flight.model';

  export default {
    name: 'claim-form',
    components: {
      InvisibleRecaptcha,
      ClaimType,
      InitialFlight,
      ConnectingFlight,
      ClaimRemarks,
      Complainant,
    },
    data() {
      return {
        numberOfSteps: 6,
      };
    },
    computed: {
      ...mapState({
        currentStep: state => state.claimForm.currentStep,
        claim: state => state.claimForm,
        claimTypes: state => state.claimForm.claimTypes,
        delays: state => state.claimForm.delays,
        initialFlight: state => state.claimForm.flights.all.getInitialFlight(),
        initialFlightHasAConnectingFlight: state => state.claimForm.flights.all.getInitialFlight().hasAConnectingFlight,
        connectingFlight: (state) => {
          if (state.claimForm.flights.all.getInitialFlight().hasAConnectingFlight) {
            return state.claimForm.flights.all.getFlight(2);
          }

          return new Flight();
        },
        flights: state => state.claimForm.flights.all,
        agreesWithGeneralTerms: state => state.claimForm.agreesWithGeneralTerms,
        sitekey: state => state.recaptcha.sitekey,
      }),
    },
    mounted() {
      document.body.scrollTop = 0;
    },
    methods: {
      getTranslatedComponent() {
        const component = this.$t(this.claim.status.component);

        let translatedComponent = `error.validation.component.${component}`;

        if (this.claim.status.component === 'flights' && typeof this.claim.status.index !== 'undefined') {
          translatedComponent = this.claim.status.index === 1
            ? `${translatedComponent}.initial`
            : `${translatedComponent}.connecting`;
        }

        return this.$t(translatedComponent);
      },
      getGeneralTermsUrl() {
        const route = this.$router.resolve('/terms-and-conditions');

        return `<a href="${route.href}" target="_blank">${this.$t('navigation.terms-and-conditions')}</a>`;
      },
      async nextStep() {
        const isValid = this.validateStep(this.currentStep);

        // eslint-disable-next-line
        console.log({ method: 'nextStep', step: this.currentStep, isValid });

        if (isValid === false) {
          return null;
        }

        let newStepValue = this.currentStep;

        if (this.currentStep === this.numberOfSteps) {
          const redirectTo = await this.$store.dispatch(SUBMIT_CLAIM).then(
            result => new Promise((resolve, reject) => {
              if (result.success) {
                resolve('claim-submitted');
              } else {
                reject();
              }
            }),
            (error) => {
              // eslint-disable-next-line
              console.log({ error });
            });

          if (this.claim.status.success === false) {
            return null;
          }

          return redirectTo;
        }

        if (this.currentStep === 2) {
          if (this.initialFlightHasAConnectingFlight === false) {
            newStepValue += 1;
          }

          if (this.initialFlightHasAConnectingFlight === true
            && this.flights.getConnectingFlights().length === 0) {
            // eslint-disable-next-line
            console.log('adding connecting flight');

            this.addConnectingFlight();

            this.$store.dispatch(SET_CURRENT_FLIGHT_ORDER, { currentFlightOrder: this.flights.length() });
          }
        }

        newStepValue += 1;

        this.$store.dispatch(SET_CURRENT_STEP, { currentStep: newStepValue });

        return null;
      },
      previousStep() {
        if (this.currentStep === 1) {
          return;
        }

        let newStepValue = this.currentStep;

        if (this.initialFlightHasAConnectingFlight === false && this.currentStep === 4) {
          newStepValue -= 1;
        }

        newStepValue -= 1;

        this.$store.dispatch(SET_CURRENT_STEP, { currentStep: newStepValue });
      },
      restart() {
        this.$store.dispatch(SET_CURRENT_STEP, { currentStep: 1 });
      },
      update(field, e) {
        this.$store.dispatch(UPDATE_CLAIM_FIELD, { field, value: e });
      },
      validateStep(step) {
        if (step === 1) {
          return this.$refs.claimType.isValid();
        }

        if (step === 2) {
          return this.$refs.initialFlight.isValid();
        }

        if (step === 3) {
          return this.$refs.connectingFlight.isValid();
        }

        if (step === 4) {
          return this.$refs.complainant.isValid();
        }

        if (step === 5) {
          return this.$refs.claimRemarks.isValid();
        }

        return true;
      },
      addConnectingFlight() {
        this.$store.dispatch(ADD_FLIGHT);
      },
      toDateString: date => (date === null ? '' : new Date(date).toLocaleDateString()),
      getListItemValue: (needle, list) => {
        if (needle === null) {
          return '';
        }

        const item = list.find(listItem => listItem.id === parseInt(needle, 10));

        return typeof item === 'undefined' ? '' : item.name;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../sass/variables';

  .stepper {
    box-shadow: none;

    .stepper__step {
      align-items: flex-start;
      padding-left: 0;
    }

    .stepper__content {
      margin-left: 12px;
    }

    .stepper__summary {
      border-left: 1px solid rgba(0, 0, 0, 0.12);
      margin: -8px 0 -8px 12px;
      padding: 0 60px 0px 25px;
      width: auto;
    }
  }

  .button-row {
    .flex {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .checkbox-label {
    margin-top: 18px;

    @media (max-width: #{map-get($grid-breakpoints, 'sm')}) {
      padding-left: 20px;
    }
  }
</style>
