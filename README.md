# Appruve

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

A NodeJS Wrapper for [Appruve](https://www.appruve.co)

## Overview
This project provides an easy-to-use object-oriented API to access endpoints delineated at https://docs.appruve.co

## Getting Started

>Install from the NPM Registry

```bash

    $ npm i --save appruve

```

# Usage

```js

let Appruve = require('appruve')

let APIKEY = 'sk_live_2hWyQ6HW73jS8p1IftJRKxDkXmSWOlE4y9Inhgyd6g5f2R7'
const environment = process.env.NODE_ENV

const appruve = new Appruve(APIKEY, environment)


// Verify a Nigeria Driver License ID

const promise1 = appruve.nigeriaDriverLicense({
  id: 'ABC00578AA2',
  first_name: 'Henry',
  last_name: 'Emeka',
  date_of_birth: '1976-04-15'
})

promise1.then(function(response){
   // Error Handling
   if(response.body.status === false){
     console.error(response.body.message);
   }
   let data = response.body.data;
}).catch(function (error) {
  // deal with error
})

// Verify a Ghana International Passport.

const promise2 = appruve.ghanaPassport({
  id:'G0000000'
})

promise2.then(function(response){
  var data = response.body
  
}).catch(function(error){
  // deal with error
})


```

## API Resources

>Each method expects an object literal with both **route parameters** and **request parameters (query / body)**. Please, go through the _src/endpoints_ folder to see the specific items that should make up the object literal for each method

- identity
  - appruve.nigeriaNationalId()
  - appruve.nigeriaVoterId()
  - appruve.nigeriaDriverLicense()
  - appruve.nigeriaBVN()
  - appruve.nigeriaPassport()
  - appruve.kenyaNationalId()
  - appruve.ugandaTelco()
  - appruve.ghanaPassport()
  - appruve.ghanaSSNIT()
  - appruve.ghanaDriverLicense()



# License

MIT

# Credits

- [Ifeora Okechukwu](https://twitter.com/isocroft)
- [Ahmad Abdul-Aziz](https://twitter.com/devamaz)



[npm-image]: https://img.shields.io/npm/v/appruve.svg?style=flat-square
[npm-url]: https://npmjs.org/package/appruve

[travis-image]: https://travis-ci.org/devamaz/appruve.svg?branch=master
[travis-url]: https://travis-ci.org/devamaz/appruve

## Support 

**Coolcodes** is a non-profit software foundation (collective) created by **Oparand** - parent company of StitchNG, Synergixe based in Abuja, Nigeria. You'll find an overview of all our work and supported open source projects on our [Facebook Page](https://www.facebook.com/coolcodes/).

>Follow us on facebook if you can to get the latest open source software/freeware news and infomation.

Does your business depend on our open projects? Reach out and support us on [Patreon](https://www.patreon.com/coolcodes/). All pledges will be dedicated to allocating workforce on maintenance and new awesome stuff.
