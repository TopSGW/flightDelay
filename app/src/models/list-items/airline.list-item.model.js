import ListItem from './list-item.model';

export default class AirlineListItem extends ListItem {
  static createListFromBackendModel(rawAirlines) {
    const airlines = [];

    rawAirlines.map(
      airline => airlines.push(new AirlineListItem(airline.id, airline.name)));

    return airlines;
  }
}

