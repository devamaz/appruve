module.exports = {
  /*
      Verify Ghana Driver License ID
      @params: id, full_name, date_of_birth, 
      */
  ghanaDriverLicense: {
    method: 'POST',
    path: '/verifications/gh/driver_license',
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
