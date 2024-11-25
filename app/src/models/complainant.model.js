import CountryListItem from './list-items/country.list-item.model';
import SalutationListItem from './list-items/salutation.list-item.model';

export default class Complainant {
  salutations = [];
  salutation = new SalutationListItem();
  language = '';
  lastName = '';
  firstName = '';
  street = '';
  houseNumber = '';
  boxNumber = '';
  postalCode = '';
  city = '';
  email = '';
  phoneNumber = '';
  country = new CountryListItem();
  countries = [];
}
