const request = require('supertest');
const express = require('express');
const app = express();

const db = require('../server/models/timeMateModels.js');

const server = 'http://localhost:3000';

// use supertest to send test requests to server
// docs: https://www.npmjs.com/package/supertest

describe('Route integration', () => {
  let entry_id;
    describe('/login', () => {
        describe('POST', () => {
          // Note that we return the evaluation of `request` here! It evaluates to
          // a promise, so Jest knows not to say this test passes until that
          // promise resolves. See https://jestjs.io/docs/en/asynchronous
          it('responds with 200 status and application/json content type', () => {
            return request(server)
              .post('/login')
              .send({username: 'workermcgee', password: 'worker'})
              .expect('Content-Type', /application\/json/)
              .expect(200);
          });
        });
    });
    
    // { time: '11:31:06', date: '2023-02-06T16:31:06.474Z', emp_id: 9 }
    describe('/clockin', () => {

      afterEach((done) => {
        const queryText = 'DELETE FROM timesheet WHERE entry_id = (SELECT max(entry_id) FROM timesheet);';
        db.query(queryText)
        .then((response) => {
          console.log('mission accomplished!');
          done();
        }) 
        .catch((err) => {
          console.log('error in clockin query');
          done();
        })
      });

      describe('POST', () => {
        it('responds with 200 status and application/json content type', () => {
          return request(server)
            .post('/clockin')
            .send({ time: '11:31:06', date: '2023-02-06T16:31:06.474Z', emp_id: 4 })
            .expect('Content-Type', /application\/json/)
            .expect(200);
        })
      })
    })

    describe('/clockout', () => {

      beforeAll((done) => {
        const queryText = 'INSERT INTO timesheet (week, emp_id, clock_in) VALUES (($1), ($2), ($3)) RETURNING entry_id;';
        const values = [6, 4, '2023-02-06T16:20:06.474Z'];
        db.query(queryText, values)
        .then((response) => {
          entry_id = response.rows[0].entry_id;
          console.log(entry_id);
          done();
        })
        .catch((err) => {
          console.log('err in clockout query');
          done();
        })
      });

      describe('PATCH', () => {
        it('responds with 200 status', () => {
          return request(server)
            .patch('/clockout')
            .send({ time: '11:31:06', date: '2023-02-06T16:31:06.474Z', entry_id: entry_id })
            .expect(200);
        })
      })
    })

    describe('/currentemphours', () => {
      describe('POST', () => {
        it('responds with 200 status and application/json content type', () => {
          return request(server)
            .post('/currentemphours')
            .send({ emp_id: 4 })
            .expect('Content-Type', /application\/json/)
            .expect(200);
        })
      })
    })

    describe('/emphours/users', () => {
      describe('GET', () => {
        it('responds with 200 status and application/json content type', () => {
          return request(server)
            .get('/emphours/users')
            .expect(response => {
              Array.isArray(response.body);
            })
            .expect(200)
        })
      })
    })







})