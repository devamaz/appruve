'use strict';

module.exports = {
  /*
  Verify Ghana Tax Identification Number
  @params: id
  */
  ghanaTIN: {
    method: 'POST',
    path: '/verifications/gh/tin',
    send_json: true,
    params: {
      id$: String,
    },
    param_defaults: null,
    route_params: null,
  },
};
