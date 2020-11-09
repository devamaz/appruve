'use strict';

module.exports = {
  /*
  Verify Nigeria Company with with the Corporate Affairs Commission
  @params: company_name, 
  */
  nigeriaCAC: {
    method: 'POST',
    path: '/verifications/ng/cac',
    send_json: true,
    params: {
      company_name$: String,
    },
    param_defaults: null,
    route_params: null,
  },
};
