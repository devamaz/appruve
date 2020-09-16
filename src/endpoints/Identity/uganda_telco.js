'use strict';

module.exports = {
  /*
  Verify Uganda Telco
  @params: first_name, last_name,  phone_number
  */
  ugandaTelco: {
    method: 'POST',
    path: '/verifications/ug/telco_subscriber',
    send_json: true,
    params: {
      first_name$: String,
      last_name$: String,
      phone_number$: String,
    },
    param_defaults: null,
    route_params: null,
  },
};
