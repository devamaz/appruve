'use strict';

module.exports = {
  /*
  Verify Nigeria  International Passport
  @params: id, first_name, last_name, middle_name, date_of_birth, gender, issue_date, expiry_date
  */
  nigeriaPassport: {
    method: 'POST',
    path: '/verifications/ng/passport',
    send_json: true,
    params: {
      id$: String,
      first_name$: String,
      last_name$: String,
      middle_name: String,
      date_of_birth$: String,
      gender: String,
      issue_date: String,
      expiry_date: String,
    },
    param_defaults: null,
    route_params: null,
  },
};
