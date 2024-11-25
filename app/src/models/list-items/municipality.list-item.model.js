import ListItem from './list-item.model';

export default class MunicipalityListItem extends ListItem {
  static createListFromBackendModel(rawMunicipalities) {
    const municipalities = [];
    let index = 1;

    rawMunicipalities.map((municipality) => {
      let id = index;

      if (municipality.id !== undefined) {
        id = municipality.id;
      }

      municipalities.push(new MunicipalityListItem(id, municipality.name));

      index += 1;

      return true;
    });

    return municipalities;
  }
}

