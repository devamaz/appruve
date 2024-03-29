'use strict';

module.exports = {
  /*
  Verify Nigeria National ID
  @params: id, first_name, last_name, middle_name, date_of_birth, phone_number, gender
  */
  nigeriavNIN: {
    method: 'POST',
    path: '/verifications/ng/virtual_nin',
    send_json: true,
    params: {
      id$: String,
      first_name$: String,
      last_name$: String,
      middle_name: String,
      date_of_birth$: String,
      phone_number: String,
      gender: String,
    },
    param_defaults: null,
    route_params: null,
  },
};
