import ListItem from './list-item.model';

export default class SalutationListItem extends ListItem {
  static createListFromBackendModel(rawSalutations) {
    const salutations = [];

    rawSalutations.map(salutation => salutations.push(
      new SalutationListItem(salutation.id, salutation.translation_code)));

    return salutations;
  }

  static translate(salutations) {
    if (typeof salutations === 'undefined') {
      return null;
    }

    return salutations.map(salutation => new SalutationListItem(salutation.id, window.Vue.$t(salutation.name)));
  }
}

