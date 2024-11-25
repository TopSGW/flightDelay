import ListItem from './list-item.model';

export default class CountryListItem extends ListItem {
  static createListFromBackendModel(rawCountries) {
    const delays = [];

    rawCountries.map(delay => delays.push(new CountryListItem(delay.id, delay.name)));

    return delays;
  }
}
