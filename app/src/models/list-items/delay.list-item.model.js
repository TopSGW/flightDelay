import ListItem from './list-item.model';

export default class DelayListItem extends ListItem {
  static createListFromBackendModel(rawDelays) {
    const delays = [];

    rawDelays.map(delay => delays.push(new DelayListItem(delay.id, delay.translation_code)));

    return delays;
  }

  static translate(delays) {
    return delays.map(delay => new DelayListItem(delay.id, window.Vue.$t(delay.name)));
  }
}

