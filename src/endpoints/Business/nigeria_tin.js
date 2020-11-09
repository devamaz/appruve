'use strict';

module.exports = {
  /*
  Verify Nigeria Tax Identification Number
  @params: id, name, email, phone_numer
  */
  nigeriaTIN: {
    method: 'POST',
    path: '/verifications/ng/tin',
    send_json: true,
    params: {
      id$: String,
      name: String,
      email: String,
      phone_numer: String,
    },
    param_defaults: null,
    route_params: null,
  },
};
