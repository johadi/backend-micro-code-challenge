// influencer.test.ts
import * as request from 'supertest';
import { assert } from 'chai';
import { ValidationError } from "express-validator";

import { app } from "../app";
import {
  createExpectedErrorMessages,
  newInfluencerPayload,
  existingInfluencer,
  nonExistingInfluencer,
  getInfluencerNofFoundExpectedErrorMessage, validationErrorMessages, createInfluencerAlreadyExistsExpectedErrorMessage
} from "./mocks";
import {getErrorMessage, removeInfluencer} from "../helpers";
import {InfluencerI} from "../interfaces";

describe('Influencer test', () => {
  const { validPayload } = newInfluencerPayload;
  beforeEach((done) => {
    removeInfluencer(validPayload.id);
    done();
  });

  describe('Base test API', () => {
    // Test for API home route and invalid routes
    it('Should return 404 for a route that does not exist',
      (done) => {
        request(app)
          .get('/api/v1/test/xyz')
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'This route doesn\'t exist');
            done();
          });
      });

    it('Should return 200 when the API v1 base url is accessed',
      (done) => {
        request(app)
          .get('/api/v1')
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'Welcome to Influencers Version 1 API');
            done();
          });
      });
  });

  describe('[POST: /api/v1/influencer] New influencer', () => {

    it('Should return status code 422 with error messages when when no payload is sent in the request',
      (done) => {
        request(app)
          .post('/api/v1/influencer')
          .send({})
          .expect(422)
          .end((err, res) => {
            if (err) return done(err);
            const errors = res.body.errors;
            const expectedErrorMessages = createExpectedErrorMessages();

            runAssertions(errors,  expectedErrorMessages);
            done();
          });
      });

    it('Should return status code 409 with response when influencer already exists',
      (done) => {
        request(app)
          .post('/api/v1/influencer')
          .send(existingInfluencer)
          .expect(409)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, createInfluencerAlreadyExistsExpectedErrorMessage);
            done();
          });
      });

    describe('Invalid Phone inputs', () => {
      const { invalidPhone } = newInfluencerPayload;

      // create an expected error messages with all the fields valid except the "phone" field
      const expectedErrorMessages = createExpectedErrorMessages(
        [
          'id',
          'igFollow',
          'igID',
          'fbID',
          'fbFollow',
          'ytFollow',
          'ytID',
          'fullName',
          'email',
          'ownPromocode',
          'refPromoCode',
          'refName']
      );
      it('Should return status code 422 with error message when phone number is too long',
        (done) => {
          request(app)
            .post('/api/v1/influencer')
            .send(invalidPhone.tooLongPayload)
            .expect(422)
            .end((err, res) => {
              if (err) return done(err);
              const errors = res.body.errors;
              runAssertions(errors,  expectedErrorMessages);
              done();
            });
        });
      it('Should return status code 422 with error message when phone number is too short',
        (done) => {
          request(app)
            .post('/api/v1/influencer')
            .send(invalidPhone.tooShortPayload)
            .expect(422)
            .end((err, res) => {
              if (err) return done(err);
              const errors = res.body.errors;
              runAssertions(errors,  expectedErrorMessages);
              done();
            });
        });
      it('Should return status code 422 with error message when phone number does not start with "+"',
        (done) => {
          request(app)
            .post('/api/v1/influencer')
            .send(invalidPhone.noPlusSymbolPayload)
            .expect(422)
            .end((err, res) => {
              if (err) return done(err);
              const errors = res.body.errors;
              runAssertions(errors,  expectedErrorMessages);
              done();
            });
        });
    });

    describe('Invalid Email inputs', () => {
      const { invalidEmail } = newInfluencerPayload;

      // create an expected error messages with all the fields valid except the "email" field
      const expectedErrorMessages = createExpectedErrorMessages(
        [
          'id',
          'igFollow',
          'igID',
          'fbID',
          'fbFollow',
          'ytFollow',
          'ytID',
          'fullName',
          'phone',
          'ownPromocode',
          'refPromoCode',
          'refName']
      );
      it('Should return status code 422 with error message when email field has no "." after "@"',
        (done) => {
          request(app)
            .post('/api/v1/influencer')
            .send(invalidEmail.noDotSymbolPayload)
            .expect(422)
            .end((err, res) => {
              if (err) return done(err);
              const errors = res.body.errors;
              runAssertions(errors,  expectedErrorMessages);
              done();
            });
        });
      it('Should return status code 422 with error message when email field has no "@"',
        (done) => {
          request(app)
            .post('/api/v1/influencer')
            .send(invalidEmail.noAtSymbolPayload)
            .expect(422)
            .end((err, res) => {
              if (err) return done(err);
              const errors = res.body.errors;
              runAssertions(errors,  expectedErrorMessages);
              done();
            });
        });
    });

    describe('When Influencer is successfully created', () => {
      // There should be no error messages, which means all the field are nullable
      const expectedErrorMessages = createExpectedErrorMessages(
        [
          'id',
          'igFollow',
          'igID',
          'fbID',
          'fbFollow',
          'ytFollow',
          'ytID',
          'fullName',
          'phone',
          'email',
          'ownPromocode',
          'refPromoCode',
          'refName']
      );

      it('Should return status code 201 with response after a new influencer is created',
        (done) => {
          request(app)
            .post('/api/v1/influencer')
            .send(validPayload)
            .expect(201)
            .end((err, res) => {
              if (err) return done(err);
              // there should be no errors
              const errors = res.body.errors;
              runAssertions(errors,  expectedErrorMessages);
              // check the response
              const addedInfluencer = res.body.find((influencer: InfluencerI) => influencer.id === validPayload.id);
              assert.deepEqual(validPayload, addedInfluencer);
              done();
            });
        });
    })
  });

  describe('[GET: /api/v1/influencer/:id] When user wants to get a location', () => {

    it('Should return status code 404 when user wants to get a location that does not exist',
      (done) => {
        request(app)
          .get(`/api/v1/influencer/${nonExistingInfluencer.id}`)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, getInfluencerNofFoundExpectedErrorMessage);
            done();
          });
      });

    it('Should return status code 404 when user wants to get a location that does not exist',
      (done) => {
        request(app)
          .get('/api/v1/influencer/invalidId')
          .expect(422)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(getErrorMessage(res.body.errors, 'id'), validationErrorMessages.getInfluencerErros.id);
            done();
          });
      });

    it('Should return status code 404 when user wants to get a location that does not exist',
      (done) => {
        request(app)
          .get(`/api/v1/influencer/${existingInfluencer.id}`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.deepEqual(res.body, existingInfluencer);
            done();
          });
      });

  });

});

// We keep the function here so it benefits from the test environment and helps readability
/**
 * Reusable function that helps to run multiple assertions in the test
 * @function runAssertions
 * @param {array} errors - errors parameter
 * @param {object} expectedErrorMessages - expectedErrorMessages parameter
 * @return {void}
 */
const runAssertions = (errors: ValidationError[], expectedErrorMessages: {[key: string]: string}): void => {
  const fields: string[] = [
    'id',
    'igFollow',
    'igID',
    'fbID',
    'fbFollow',
    'ytFollow',
    'ytID',
    'fullName',
    'email',
    'phone',
    'ownPromocode',
    'refPromoCode',
    'refName'];

  fields.forEach((field) => {
    assert.equal(getErrorMessage(errors, field), expectedErrorMessages[field]);
  });
};
