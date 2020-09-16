'use strict';

module.exports = {
  /*
  Verify Nigeria Driver License ID
  @params: id, first_name, last_name, middle_name, date_of_birth, phone_number, gender, address, expiry_date
  */
  nigeriaDriverLicense: {
    method: 'POST',
    path: '/verifications/ng/driver_license',
    send_json: true,
    params: {
      id$: String,
      first_name$: String,
      last_name$: String,
      middle_name: String,
      date_of_birth$: String,
      phone_number: String,
      gender: String,
      address: String,
      expiry_date: String,
    },
    param_defaults: null,
    route_params: null,
  },
};
