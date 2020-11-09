'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

describe('Appruve Instance Test(s)', function () {
  // Created Instance
  var Appruve = require('../index');
  var instance = new Appruve(
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI5MTAyY2FjYi00ZTVmLTRkYzktYWNiNi1hMTFlYzc2ZDQ2MjgiLCJhdWQiOiI2MGY4Y2EzMy1mNjc1LTQ5OTYtYTk5Mi1iNTM0Njg1YTRkZTQiLCJzdWIiOiIwOTJiOThjYi00N2IyLTRiMjctYWU0ZC0xNDk0ZGYzOThiNTAiLCJuYmYiOjAsInNjb3BlcyI6WyJ2ZXJpZmljYXRpb25fdmlldyIsInZlcmlmaWNhdGlvbl9saXN0IiwidmVyaWZpY2F0aW9uX2RvY3VtZW50IiwidmVyaWZpY2F0aW9uX2lkZW50aXR5Il0sImV4cCI6MTYwNDQ5MTgzMywiaWF0IjoxNjAxODk5ODMzfQ.stxvCZsT2J8gBM1Bt1BwxfWrhFOknfXbgB-23Cqtehw'
  );

  it('should have a function [mergeNewOptions]', function () {
    /* eslint-disable no-unused-expressions */
    expect(typeof instance.mergeNewOptions === 'function').to.be.true;
    expect(typeof instance.nigeriaTIN === 'function').to.be.true;
    expect(typeof instance.nigeriaDriverLicense === 'function').to.be.true;
    expect(typeof instance.nigeriaVoterId === 'function').to.be.true;
    expect(typeof instance.kenyaNationalId === 'function').to.be.true;
    expect(typeof instance.ugandaTelco === 'function').to.be.true;
    expect(typeof instance.ghanaDriverLicense === 'function').to.be.true;
    /* eslint-enable no-unused-expressions */
  });

  it('should throw an error if method is called without required arguments', function () {
    try {
      instance.nigeriaTIN();
    } catch (err) {
      should.exist(err);
    }
  });

  it('should throw an error if method is called with any arguments other than an object', function () {
    try {
      instance.ghanaSSNIT([]);
    } catch (err) {
      should.exist(err);
    }
  });
});
