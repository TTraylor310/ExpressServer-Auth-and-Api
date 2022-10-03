'use strict';

const supertest = require('supertest');
const { app } = require('../../src/server');
const request = supertest(app);

describe('Test catch-all route', () => {
  it('correctly calls the 404 middleware', async () => {
    const response = await request.get('/invalidRoute').send();
    expect(response.status).toEqual(500);
    expect(response.body.error).toEqual(500);
    expect(response.body.route).toEqual('/invalidRoute');
  });
});
