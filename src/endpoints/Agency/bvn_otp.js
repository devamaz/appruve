'use strict';

module.exports = {
  /*
  Verify Nigeria BVN with a one-time password (OTP)
  @params: bvn
  */
  nigeriaVerifyBVN: {
    method: 'POST',
    path: '/verifications/bvn/verify',
    send_json: true,
    params: {
      bvn$: String,
    },
    param_defaults: null,
    route_params: null,
  },
};