'use strict';

const got = require('got');
const querystring = require('querystring');
const _ = require('lodash');

const nigeriaNationalId = require('../endpoints/Identity/nigeria_national_id');
const nigeriaVoterId = require('../endpoints/Identity/nigeria_voter_id');
const nigeriaDriverLicense = require('../endpoints/Identity/nigeria_driver_license');
const nigeriaBVN = require('../endpoints/Identity/nigeria_bvn');
const nigeriaPassport = require('../endpoints/Identity/nigeria_passport');
const kenyaNationalId = require('../endpoints/Identity/kenya_national_id');
const ugandaTelco = require('../endpoints/Identity/uganda_telco');
const ghanaPassport = require('../endpoints/Identity/ghana_passport');
const ghanaSSNIT = require('../endpoints/Identity/ghana_ssnit');
const ghanaDriverLicense = require('../endpoints/Identity/ghana_driver_license');
const ghanaTIN = require('../endpoints/Business/ghana_tin');
const kenyaKRA = require('../endpoints/Business/kenya_kra_pin');
const nigeriaCAC = require('../endpoints/Business/nigeria_cac');
const nigeriaTIN = require('../endpoints/Business/nigeria_tin');
const nigeriaValiateBVN = require('../endpoints/Agency/validate_bvn');
const nigeriaVerifyBVN = require('../endpoints/Agency/bvn_otp');
const nigeriavNIN = require('../endpoints/Identity/nigeria_vNIN')

/* Any param with '$' at the end is a REQUIRED param both for request body param(s) and request route params */
const apiEndpoints = Object.assign(
  {},
  nigeriaNationalId,
  nigeriaVoterId,
  nigeriaDriverLicense,
  nigeriaBVN,
  nigeriaPassport,
  kenyaNationalId,
  ugandaTelco,
  ghanaPassport,
  ghanaSSNIT,
  ghanaDriverLicense,
  ghanaTIN,
  kenyaKRA,
  nigeriaCAC,
  nigeriaTIN,
  nigeriaValiateBVN,
  nigeriaVerifyBVN,
  nigeriavNIN
  
);

/*!
 *
 * Provides a convenience extension to _.isEmpty which allows for
 * determining an object as being empty based on either the default
 * implementation or by evaluating each property to undefined, in
 * which case the object is considered empty.
 */
_.mixin(
  (function () {
    // reference the original implementation
    var _isEmpty = _.isEmpty;
    return {
      // If defined is true, and value is an object, object is considered
      // to be empty if all properties are undefined, otherwise the default
      // implementation is invoked.
      isEmpty: function (value, defined) {
        if (defined && _.isObject(value)) {
          return !_.some(value, function (value, key) {
            return value !== undefined;
          });
        }
        return _isEmpty(value);
      },
    };
  })()
);

const isLiteralFalsey = (variable) => {
  return variable === '' || variable === false || variable === 0;
};

const checkTypeName = (target, type) => {
  let typeName = '';
  if (isLiteralFalsey(target)) {
    typeName = typeof target;
  } else {
    typeName = '' + (target && target.constructor.name);
  }
  return !!(typeName.toLowerCase().indexOf(type) + 1);
};

const isTypeOf = (value, type) => {
  let result = false;

  type = type || [];

  if (typeof type === 'object') {
    if (typeof type.length !== 'number') {
      return result;
    }

    let bitPiece = 0;
    type = [].slice.call(type);

    type.forEach((_type) => {
      if (typeof _type === 'function') {
        _type = (_type.name || _type.displayName).toLowerCase();
      }
      bitPiece |= 1 * checkTypeName(value, _type);
    });

    result = !!bitPiece;
  } else {
    if (typeof type === 'function') {
      type = (type.name || type.displayName).toLowerCase();
    }

    result = checkTypeName(value, type);
  }

  return result;
};

const isNullOrUndefined = (value) => {
  return isTypeOf(value, ['undefined', 'null']);
};

const isNumeric = (value) => {
  if (isTypeOf(value, ['string', 'number'])) {
    return isTypeOf(Math.abs(-value), 'number');
  }
  return false;
};

const setPathName = (config, values) => {
  return config.path.replace(/\{:([\w]+)\}/g, function (match, string, offset) {
    let _value =
      values[string] ||
      (isTypeOf(config.alternate_route_params_keymap, 'object')
        ? values[config.alternate_route_params_keymap[string]]
        : false);
    if (config.route_params_numeric === true) {
      if (!isNumeric(_value)) {
        return null;
      }
    }
    return isTypeOf(_value, config.route_params[string] || String)
      ? _value
      : null;
  });
};

const _jsonify = (data) => {
  return isNullOrUndefined(data)
    ? 'null'
    : typeof data === 'object'
    ? data instanceof Date
      ? data.toISOString().replace(/Z$/, '')
      : 'toJSON' in data
      ? data.toJSON().replace(/Z$/, '')
      : JSON.stringify(data)
    : String(data);
};

const setInputValues = (config, inputs) => {
  let httpReqOptions = {};
  let inputValues = {};
  let label = '';

  switch (config.method) {
    case 'GET':
    case 'HEAD':
    case 'DELETE':
      label = 'query';
      break;

    case 'POST':
    case 'PUT':
    case 'PATCH':
      label = 'body';
      break;
  }

  httpReqOptions[label] = {};

  if (config.param_defaults) {
    inputs = Object.assign({}, config.param_defaults, inputs);
  }

  for (var input in config.params) {
    if (config.params.hasOwnProperty(input)) {
      let param = input.replace('$', '');
      let _input = inputs[param];
      let _type = config.params[input];
      let _required = false;

      if (input.indexOf('$') + 1 === input.length) {
        _required = true;
      }

      if (isNullOrUndefined(_input) || _input === '') {
        if (_required) {
          throw new Error(
            `param: "${param}" is required but not provided; please provide as needed`
          );
        }
      } else {
        httpReqOptions[label][param] = isTypeOf(_input, _type)
          ? label === 'query'
            ? querystring.escape(_jsonify(_input))
            : _jsonify(_input)
          : null;

        if (httpReqOptions[label][param] === null) {
          throw new Error(
            `param: "${param}" is not of type ${
              _type.name || _type
            }; please provided as needed`
          );
        }
      }
    }
  }

  inputValues[label] =
    label === 'body'
      ? config.send_form
        ? httpReqOptions[label]
        : JSON.stringify(httpReqOptions[label])
      : querystring.stringify(httpReqOptions[label]);

  return inputValues;
};

const makeMethod = function (config) {
  let httpConfig = {
    headers: {
      'Cache-Control': 'no-cache',
      Accept: 'application/json',
    },
    json: true,
  };

  if (config.send_json) {
    httpConfig.headers['Content-Type'] = httpConfig.headers['Accept'];
    httpConfig.form = false;
  } else if (config.send_form) {
    httpConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    httpConfig.form = true;
  }

  return function (requestParams = {}) {
    let pathname = config.path;
    let payload = false;

    if (!(requestParams instanceof Object)) {
      throw new TypeError(
        'Argument: [ requestParam(s) ] Should Be An Object Literal'
      );
    }

    if (!_.isEmpty(requestParams, true)) {
      if (config.params !== null) {
        payload = setInputValues(config, requestParams);
      }

      if (config.route_params !== null) {
        pathname = setPathName(config, requestParams);
      }
    } else {
      if (config.params !== null || config.route_params !== null) {
        throw new TypeError(
          'Argument: [ requestParam(s) ] Not Meant To Be Empty!'
        );
      }
    }

    if (payload === false) {
      payload = {};
    }

    for (let type in payload) {
      if (payload.hasOwnProperty(type)) {
        httpConfig[type] =
          type === 'query' ? payload[type] : JSON.parse(payload[type]);
      }
    }

    let reqVerb = config.method.toLowerCase();
    let baseUrl = this.httpClientBaseOptions.baseUrl;

    httpConfig.headers['Authorization'] = this.bearerHeaderValue;

    return this.httpBaseClient[reqVerb](`${baseUrl}${pathname}`, httpConfig);
  };
};

class Appruve {
  constructor(apiKey, appEnv = 'development') {
    const environment = /^(?:development|local|dev)$/;

    this.api_base = {
      sandbox: 'https://api.appruve.co/v1',
      live: 'https://api.appruve.co/v1',
    };

    this.bearerHeaderValue = `Bearer ${apiKey}`;

    this.httpClientBaseOptions = {
      baseUrl: environment.test(appEnv)
        ? this.api_base.sandbox
        : this.api_base.live,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    };

    this.httpBaseClient = got;
  }
}

for (let methodName in apiEndpoints) {
  if (apiEndpoints.hasOwnProperty(methodName)) {
    Appruve.prototype[methodName] = makeMethod(apiEndpoints[methodName]);
  }
}

module.exports = Appruve;
