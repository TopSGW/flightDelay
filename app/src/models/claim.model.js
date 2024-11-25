import ClaimTypeListItem from './list-items/claim-type.list-item.model';
import ApiResult from './api-result.model';

export default class Claim {
  currentStep = 1;
  claimTypes = [];
  claimType = new ClaimTypeListItem();
  delays = [];
  agreesWithGeneralTerms = false;
  status = new ApiResult();
  remarks = '';
}
