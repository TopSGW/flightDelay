// eslint-disable-next-line
/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["flight"] }] */

import Vue from 'vue';
import Flight from './flight.model';
import DelayListItem from './list-items/delay.list-item.model';

export const MESSAGE_OK = { status: 'ok' };

export default class FlightCollection {
  flights = [];
  message = MESSAGE_OK;

  constructor() {
    this.addFlight(new Flight());
  }

  length() {
    return this.flights.length;
  }

  addFlight(flight = null) {
    let flightToAdd = flight;

    if (flight === null) {
      flightToAdd = new Flight();
    }

    const isValid = this.validateFlight(flightToAdd);

    if (isValid === false) {
      return null;
    }

    if (this.flights.length === 0) {
      return this.addInitialFlight(flightToAdd);
    }

    return this.addConnectingFlight(flightToAdd);
  }

  validateFlight(flight) {
    if (this.flights.length < 2) {
      return true;
    }

    const lastFlight = this.flights[this.flights.length - 1];

    if (flight.flightDate < lastFlight.flightDate) {
      this.message = {
        status: 'failed',
        message: Vue.i18n.translate('validation.flight-date-not-past-last-flight-date'),
      };

      return false;
    }

    return true;
  }

  addInitialFlight(flight) {
    const flightToAdd = Object.assign(flight, {
      isInitial: true, flightOrder: 1,
    });

    this.flights.push(flightToAdd);

    return flightToAdd;
  }

  addConnectingFlight(flight) {
    const previousFlight = this.getFlight(this.flights.length);

    // eslint-disable-next-line
    console.log({ previousFlight, flight });

    flight.isInitial = false;
    flight.flightNumberIsKnown = previousFlight.flightNumberIsKnown;
    flight.flightDate = previousFlight.flightDate;
    flight.departureAirports = previousFlight.destinationAirports;
    flight.departureAirport = previousFlight.destinationAirport;
    flight.departureMunicipality = previousFlight.destinationMunicipality;
    flight.delay = new DelayListItem();
    flight.flightOrder = previousFlight.flightOrder + 1;

    this.flights.push(flight);

    // eslint-disable-next-line
    console.log({ flight });

    return flight;
  }

  getAll() {
    return this.flights;
  }

  getFlight(flightOrder) {
    return this.flights.filter(flight => flight.flightOrder === flightOrder)[0];
  }

  getConnectingFlights() {
    const connectingFlights = this.flights.filter(flight => flight.isInitial === false);

    // eslint-disable-next-line
    console.log({ connectingFlights });

    return connectingFlights;
  }

  getInitialFlight() {
    return this.flights.filter(flight => flight.isInitial === true)[0];
  }
}
