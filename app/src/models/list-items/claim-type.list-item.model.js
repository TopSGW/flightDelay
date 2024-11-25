import ListItem from './list-item.model';

export default class ClaimTypeListItem extends ListItem {
  static createListFromBackendModel(rawClaimTypes) {
    const claimTypes = [];

    rawClaimTypes.map(claimType => claimTypes.push(new ClaimTypeListItem(claimType.id, claimType.translation_code)));

    return claimTypes;
  }

  static translate(claimTypes) {
    return claimTypes.map(claimType => new ClaimTypeListItem(claimType.id, window.Vue.$t(claimType.name)));
  }
}

