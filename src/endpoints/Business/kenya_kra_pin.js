'use strict';

module.exports = {
  /*
  Verify Kenya KRA PIN 
  @params: pin
  */
  kenyaKRA: {
    method: 'POST',
    path: '/verifications/ke/kra',
    send_json: true,
    params: {
      pin$: String,    
    },
    param_defaults: null,
    route_params: null,
  },
};
