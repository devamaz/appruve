'use strict';

module.exports = {
  /*
  Validate the OTP sent to a BVN owner
  @params: otp, nce
  */
  nigeriaValiateBVN: {
    method: 'POST',
    path: '/verifications/bvn/validate',
    send_json: true,
    params: {
      otp$: String,
      nce$: String,
    },
    param_defaults: null,
    route_params: null,
  },
};
