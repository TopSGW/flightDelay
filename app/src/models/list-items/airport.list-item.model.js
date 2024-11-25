import ListItem from './list-item.model';

export default class AirportListItem extends ListItem {
  static createListFromBackendModel(rawAirports) {
    const airports = [];

    rawAirports.map(
      airport => airports.push(new AirportListItem(airport.id, airport.name)));

    return airports;
  }
}

