import DelayListItem from './list-items/delay.list-item.model';
import AirportListItem from './list-items/airport.list-item.model';
import AirlineListItem from './list-items/airline.list-item.model';

export default class Flight {
  flightDate = null;
  flightNumber = null;
  flightNumberIsKnown = true;
  delay = new DelayListItem();
  departureMunicipality = null;
  departureAirports = [];
  departureAirport = new AirportListItem();
  destinationMunicipality = null;
  destinationAirports = [];
  destinationAirport = new AirportListItem();
  airlines = [];
  airline = new AirlineListItem();
  hasAConnectingFlight = false;

  constructor(flightOrder = 0, isInitial = true) {
    this.flightOrder = flightOrder;
    this.isInitial = isInitial;
  }
}
