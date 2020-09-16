module.exports = {
  /*
    Verify Ghana International Passport
    @params: id, full_name, date_of_birth, 
    */
  ghanaSSNIT: {
    method: 'POST',
    path: '/verifications/gh/ssnit',
    send_json: true,
    params: {
      id$: String,
      full_name: String,
      date_of_birth: String,
    },
    param_defaults: null,
    route_params: null,
  },
};
