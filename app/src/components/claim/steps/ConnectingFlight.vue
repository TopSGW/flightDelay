<template>
  <div>
    <v-menu lazy
            :close-on-content-click="true"
            v-model="flightDateMenu"
            transition="v-scale-transition"
            offset-y
            :nudge-left="40">
      <v-text-field id="flightDate"
                    name="flightDate"
                    ref="flightDate"
                    slot="activator"
                    :label="$t('claimform.flight-date')"
                    :value="flightDate | dateFormat"
                    :rules="validation.fields.flightDate.rules"
                    :prepend-icon="indent ? 'event' : ''"
                    @focus="touch('flightDate', $event.target.value, 'focus')"
                    required
                    readonly>
      </v-text-field>

      <v-date-picker :value="flightDate"
                     @input="update('flightDate', $event)"
                     :formatted-value.sync="formattedFlightDate"
                     :allowed-dates="allowedFlightDates"
                     no-title
                     scrollable
                     actions>
      </v-date-picker>
    </v-menu>

    <v-layout row wrap>
      <v-flex xs12 sm6 class="radio-label subheading">{{ $t('claimform.do-you-know-the-flight-number') }}</v-flex>

      <v-flex xs6 sm3>
        <v-radio :label="$t('claimform.yes')"
                 id="flightNumberIsKnown"
                 name="flightNumberIsKnown"
                 ref="flightNumberIsKnown"
                 @change="update('flightNumberIsKnown', $event)"
                 v-model="flightNumberKnownValue"
                 value="flightNumberIsKnown">
        </v-radio>
      </v-flex>

      <v-flex xs6 sm3>
        <v-radio :label="$t('claimform.no')"
                 id="flightNumberIsUnKnown"
                 name="flightNumberIsKnown"
                 ref="flightNumberIsUnKnown"
                 @change="update('flightNumberIsUnKnown', $event)"
                 v-model="flightNumberKnownValue"
                 value="flightNumberIsUnKnown">
        </v-radio>
      </v-flex>
    </v-layout>

    <template v-if="flightNumberIsKnown === true">
      <v-layout row wrap>
        <v-flex xs12 sm11 offset-sm1>
          <v-text-field id="flightNumber"
                        name="flightNumber"
                        ref="flightNumber"
                        :label="$t('claimform.flight-number')"
                        :disabled="flightNumberIsKnown === false"
                        :value.trim="flightNumber"
                        :hint="$t('claimform.enter-flightNumber')"
                        :rules="validation.fields.flightNumber.rules"
                        @input="update('flightNumber', $event)"
                        @focus="touch('flightNumber', $event.target.value, 'focus')"
                        :required="flightNumberIsKnown === true">
          </v-text-field>
        </v-flex>
      </v-layout>
    </template>

    <template v-if="flightNumberIsKnown === false">
      <v-layout row wrap>
        <v-flex xs12 offset-sm1 sm11>
          <v-alert info value="true">
            {{ $t('info.claimform.flight-fields') }}
          </v-alert>
        </v-flex>
      </v-layout>

      <br>

      <v-layout row wrap>
        <v-flex xs2 sm1 offset-sm1>
          <v-icon>flight_takeoff</v-icon>
        </v-flex>
        <v-flex xs10 class="subheading">
          {{ $t('claimform.departure') }}
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm2>
          <type-ahead id="departureMunicipality"
                      name="departureMunicipality"
                      ref="departureMunicipality"
                      :label="$t('claimform.departure-city')"
                      :value="departureMunicipality"
                      :hint="$t('claimform.enter-departure-city')"
                      @fetchData="fetchDepartureMunicipalities"
                      @itemSelected="departureMunicipalitySelected">
          </type-ahead>

          <v-select id="departureAirport"
                    name="departureAirport"
                    :label="$t('claimform.departure-airport')"
                    :hint="$t('claimform.enter-departure-airport')"
                    :items="departureAirports"
                    :value="departureAirport.id"
                    itemValue="id"
                    itemText="name"
                    :disabled="departureMunicipality === null"
                    @input="update('departureAirport', $event)">
          </v-select>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs2 sm1 offset-sm1>
          <v-icon>flight_land</v-icon>
        </v-flex>
        <v-flex xs10 class="subheading">
          {{ $t('claimform.arrival') }}
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12 sm10 offset-sm2>
          <type-ahead id="destinationMunicipality"
                      name="destinationMunicipality"
                      ref="destinationMunicipality"
                      :label="$t('claimform.arrival-city')"
                      :value="destinationMunicipality"
                      :hint="$t('claimform.enter-arrival-city')"
                      @fetchData="fetchDestinationMunicipalities"
                      @itemSelected="destinationMunicipalitySelected">
          </type-ahead>

          <v-select id="destinationAirport"
                    name="destinationAirport"
                    :label="$t('claimform.arrival-airport')"
                    :hint="$t('claimform.enter-arrival-airport')"
                    :items="destinationAirports"
                    :value="destinationAirport.id"
                    itemValue="id"
                    itemText="name"
                    :disabled="destinationMunicipality === null"
                    @input="update('destinationAirport', $event)">
          </v-select>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex class="radio-label" xs2 sm1 offset-sm1>
          <v-icon>airplanemode_active</v-icon>
        </v-flex>
        <v-flex xs12 sm10>
          <v-select id="airline"
                    name="airline"
                    :label="$t('claimform.airline')"
                    :hint="$t('claimform.enter-airline')"
                    :items="airlines"
                    :value="airline.id"
                    itemValue="id"
                    itemText="name"
                    :disabled="departureAirport.id === 0 || destinationAirport.id === 0"
                    @input="update('airline', $event)">
          </v-select>
        </v-flex>
      </v-layout>
    </template>

    <v-flex xs12>
      <v-select id="delay"
                name="delay"
                ref="delay"
                :label="$t('claimform.delay')"
                :items="delays"
                :value="delay.id"
                itemValue="id"
                itemText="name"
                required
                :rules="validation.fields.delay.rules"
                @input="update('delay', $event)"
                @blur.native="touch('delay', $event.target.value, 'blur')"
                :prepend-icon="indent ? 'timer' : ''">
      </v-select>
    </v-flex>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import TypeAhead from '../../TypeAhead';
  import {
    CLEAR_AIRLINE_SELECTION,
    CLEAR_DEPARTURE_AIRPORT_SELECTIONS,
    CLEAR_DESTINATION_AIRPORT_SELECTIONS,
    GET_DEPARTURE_MUNICIPALITIES,
    GET_DESTINATION_MUNICIPALITIES,
    GET_FLIGHT_AIRLINES,
    SET_DEPARTURE_AIRPORT,
    SET_DEPARTURE_MUNICIPALITY,
    SET_DESTINATION_AIRPORT,
    SET_DESTINATION_MUNICIPALITY,
    UPDATE_FLIGHT,
  } from '../../../store/claim-form/flights/index';
  import { LOAD_DELAYS } from '../../../store/claim-form/index';
  import DelayListItem from '../../../models/list-items/delay.list-item.model';
  import AirlineListItem from '../../../models/list-items/airline.list-item.model';
  import AirportListItem from '../../../models/list-items/airport.list-item.model';
  import Validation from '../../../validation/validation.mixin';

  const BREAKPOINT_SM = 600;

  export default {
    name: 'connecting-flight',
    components: {
      TypeAhead,
    },
    mixins: [Validation],
    filters: {
      dateFormat: (value) => {
        const formattedValue = (typeof value === 'undefined' || value === null)
          ? ''
          : window.moment(value, 'YYYY-MM-DD', true).format('L');

        return formattedValue;
      },
    },
    data() {
      return {
        indent: false,
        connectingFlightValue: this.hasAConnectingFlight ? 'hasAConnectingFlight' : 'noConnectingFlight',
        flightNumberKnownValue: 'flightNumberIsKnown',
        flightNumberIsKnownWasInitialized: false,
        flightDateMenu: null,
        formattedFlightDate: null,
        allowedFlightDates: {
          min: null,
          max: new Date(),
        },
        validation: {
          fields: {
            flightDate: {
              rules: [
                (value, shouldBeDirty) => this.required(
                  'flightDate',
                  window.Vue.$t('claimform.flight-date'),
                  value,
                  shouldBeDirty,
                ),
                (value, shouldBeDirty) => this.before(
                  'flightDate',
                  window.Vue.$t('claimform.flight-date'),
                  value,
                  window.moment(),
                  shouldBeDirty,
                ),
              ],
              dirty: false,
              isSelectField: false,
            },
            flightNumber: {
              rules: [
                (value, shouldBeDirty) => (this.flightNumberIsKnown === true
                  ? this.required('flightNumber', window.Vue.$t('claimform.flight-number'), value, shouldBeDirty)
                  : true),
              ],
              dirty: false,
              isSelectField: false,
            },
            delay: {
              rules: [
                (value, shouldBeDirty) => this.required('delay', window.Vue.$t('claimform.delay'), value, shouldBeDirty),
              ],
              dirty: false,
              isSelectField: true,
            },
          },
          groups: {
            flightNumberKnown: ['flightNumber'],
            flightNumberUnKnown: [],
          },
          selectFields: ['delay'],
        },
      };
    },
    computed: {
      ...mapState({
        currentStep: state => state.claimForm.currentStep,
        delays: state => DelayListItem.translate(state.claimForm.delays),
        delay: state => state.claimForm.flights.all.getFlight(state.claimForm.flights.currentFlightOrder).delay,
        flightNumberIsKnown: state => state.claimForm.flights.all
                                           .getFlight(state.claimForm.flights.currentFlightOrder).flightNumberIsKnown,
        flightDate: state => state.claimForm.flights.all.getFlight(
          state.claimForm.flights.currentFlightOrder).flightDate,
        flightNumber: state => state.claimForm.flights.all.getFlight(
          state.claimForm.flights.currentFlightOrder).flightNumber,
        departureMunicipality: state => state.claimForm.flights.all.getFlight(
          state.claimForm.flights.currentFlightOrder).departureMunicipality,
        departureAirports: state => state.claimForm.flights.all.getFlight(
          state.claimForm.flights.currentFlightOrder).departureAirports,
        departureAirport: state => state.claimForm.flights.all.getFlight(
          state.claimForm.flights.currentFlightOrder).departureAirport,
        destinationMunicipality: state => state.claimForm.flights.all.getFlight(
          state.claimForm.flights.currentFlightOrder).destinationMunicipality,
        destinationAirports: state => state.claimForm.flights.all.getFlight(
          state.claimForm.flights.currentFlightOrder).destinationAirports,
        destinationAirport: state => state.claimForm.flights.all.getFlight(
          state.claimForm.flights.currentFlightOrder).destinationAirport,
        airline: state => state.claimForm.flights.all.getFlight(state.claimForm.flights.currentFlightOrder).airline,
        airlines: state => state.claimForm.flights.all.getFlight(state.claimForm.flights.currentFlightOrder).airlines,
        hasAConnectingFlight: state => state.claimForm.flights.all.getFlight().hasAConnectingFlight,
        locale: state => state.i18n.locale,
      }),
    },
    created() {
      this.$store.dispatch(LOAD_DELAYS);
    },
    mounted() {
      window.addEventListener('resize', this.onWindowResize);

      this.onWindowResize();
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onWindowResize);
    },
    updated() {
      if (this.currentStep !== 3) {
        return;
      }

      this.flightNumberKnownValue = this.flightNumberIsKnown ? 'flightNumberIsKnown' : 'flightNumberIsUnKnown';

      if (this.flightNumberIsKnownWasInitialized === false) {
        this.flightNumberIsKnownWasInitialized = true;

        return;
      }

      // eslint-disable-next-line
      console.log({ method: 'flight-number-updated', flightNumberIsKnown: this.flightNumberIsKnown });

      if (typeof this.$refs.departureMunicipality !== 'undefined') {
        this.$refs.departureMunicipality.setValue(this.departureMunicipality);
      }
    },
    methods: {
      onWindowResize() {
        this.indent = (window.innerWidth > BREAKPOINT_SM);
      },
      // eslint-disable-next-line
      update(field, e) {
        let value = null;
        let fieldName = field;

        // eslint-disable-next-line
        console.info({ method: 'update', field, e });

        switch (field) {
          case 'delay':
            value = this.delays.find(delay => delay.id === parseInt(e, 10));

            if (typeof value === 'undefined') {
              value = new DelayListItem();
            }

            break;
          case 'flightNumberIsKnown':
            value = true;

            break;
          case 'flightNumberIsUnKnown':
            fieldName = 'flightNumberIsKnown';
            value = false;

            break;
          case 'departureAirport':
            value = this.departureAirports.filter(airport => airport.id === parseInt(e, 10))[0];

            this.$refs.destinationMunicipality.clear();
            this.$store.dispatch(CLEAR_DESTINATION_AIRPORT_SELECTIONS);

            if (typeof value === 'undefined') {
              value = new AirportListItem();

              return;
            }

            // eslint-disable-next-line
            console.log({ method: 'update', departureAirport: value });

            this.$store.dispatch(SET_DEPARTURE_AIRPORT, { departureAirport: value });

            return;
          case 'destinationAirport':
            value = this.destinationAirports.filter(airport => airport.id === parseInt(e, 10))[0];

            this.$store.dispatch(CLEAR_AIRLINE_SELECTION);

            if (typeof value === 'undefined') {
              value = new AirportListItem();

              return;
            }

            // eslint-disable-next-line
            console.log({ method: 'update', destinationAirport: value });

            this.$store.dispatch(SET_DESTINATION_AIRPORT, { destinationAirport: value });

            this.$store.dispatch(GET_FLIGHT_AIRLINES)
                .catch((error) => {
                  if (error.status_code === 404) {
                    // eslint-disable-next-line
                    console.log(error.message);
                  }
                });

            return;
          case 'airline':
            value = this.airlines.filter(airline => airline.id === parseInt(e, 10))[0];

            // eslint-disable-next-line
            console.log({ method: 'update', airline: value });

            if (typeof value === 'undefined') {
              value = new AirlineListItem();

              return;
            }

            break;
          case 'hasAConnectingFlight':
            value = (e === 'hasAConnectingFlight');

            break;
          default:
            value = e;
        }

        this.$store.dispatch(UPDATE_FLIGHT, { field: fieldName, value });
      },
      fetchDepartureMunicipalities(query) {
        this.$store
            .dispatch(GET_DEPARTURE_MUNICIPALITIES, { query })
            .then(listItems => this.$refs.departureMunicipality.setListItems(listItems))
            .catch((error) => {
              if (error.status_code === 404) {
                // eslint-disable-next-line
                console.log(error.message);
              }
            });
      },
      departureMunicipalitySelected(selectedItem) {
        this.$store.dispatch(CLEAR_DEPARTURE_AIRPORT_SELECTIONS);

        this.$refs.destinationMunicipality.clear();

        if (typeof selectedItem === 'undefined' || selectedItem.name.length === 0) {
          return;
        }

        this.$store
            .dispatch(SET_DEPARTURE_MUNICIPALITY, { municipality: selectedItem.name })
            .catch((error) => {
              if (error.status_code === 404) {
                // eslint-disable-next-line
                console.log(error.message);
              }
            });
      },
      fetchDestinationMunicipalities(query) {
        this.$store
            .dispatch(GET_DESTINATION_MUNICIPALITIES, { query })
            .then(listItems => this.$refs.destinationMunicipality.setListItems(listItems))
            .catch((error) => {
              if (error.status_code === 404) {
                // eslint-disable-next-line
                console.log(error.message);
              }
            });
      },
      destinationMunicipalitySelected(selectedItem) {
        this.$store.dispatch(CLEAR_DESTINATION_AIRPORT_SELECTIONS);

        if (typeof selectedItem === 'undefined' || selectedItem.name.length === 0) {
          return;
        }

        this.$store
            .dispatch(SET_DESTINATION_MUNICIPALITY, { municipality: selectedItem.name })
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
  @import '../../../sass/variables';

  .radio-label {
    margin-top: 20px;
  }
</style>
