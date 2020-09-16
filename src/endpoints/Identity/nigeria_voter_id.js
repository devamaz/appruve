'use strict';

module.exports = {
  /*
  Verify Nigeria Voter ID
  @params: id, first_name, last_name, middle_name, date_of_birth, gender
  */
  nigeriaVoterId: {
    method: 'POST',
    path: '/verifications/ng/voter',
    send_json: true,
    params: {
      id$: String,
      first_name$: String,
      last_name$: String,
      middle_name: String,
      date_of_birth$: String,
      gender: String,
    },
    param_defaults: null,
    route_params: null,
  },
};
