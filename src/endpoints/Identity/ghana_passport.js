'use strict';

module.exports = {
  /*
  Verify Ghana International Passport
  @params: id, first_name, last_name, middle_name, date_of_birth, 
  */
  ghanaPassport: {
    method: 'POST',
    path: '/verifications/gh/passport',
    send_json: true,
    params: {
      id$: String,
      first_name: String,
      last_name: String,
      middle_name: String,
      date_of_birth: String,
      
    },
    param_defaults: null,
    route_params: null,
  },
};
