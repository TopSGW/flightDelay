import ApiResult from './api-result.model';

export default class Contact {
  name = '';
  email = '';
  subject = '';
  message = '';
  status = new ApiResult();
}
