'use strict';

const supertest = require('supertest');
const { app } = require('../../src/server');
const mockRequest = supertest(app);
const { db, users } = require('../../src/models/index');
const base64 = require('base-64');

const newUser1 = {
  username: 'Joe',
  password: 'joepass',
  role: 'admin',
};

const newUser2 = {
  username: 'Bob',
  password: 'bobpass',
  role: 'user',
};

const newMovie = {
  title: 'Top Gun: Maverick',
  genre: 'action',
  year: 2022,
};

const newMusic = {
  song: 'I Ain\'t Worried',
  artist: 'OneRepublic',
  genre: 'pop',
  year: 2022,
};

beforeAll(async () => {
  await db.sync();
  await users.create(newUser1);
  await users.create(newUser2);
});

afterAll(async () => {
  await db.drop();
  await db.close();
});

describe('Testing the POST methods/routes for creating/adding new items with write access', () => {
  it('Adds a new movie with write access', async () => {
    const token = base64.encode(`${newUser1.username}:${newUser1.password}`);
    const response = await mockRequest.post('/signin').set('Authorization', `Basic ${token}`).send();
    const bearerToken = response.body.token;
    const getAllResponse = await mockRequest.post('/movies').set('Authorization', `Bearer ${bearerToken}`).send(newMovie);
    expect(getAllResponse.status).toEqual(201);
  });

  it('Denies access to adding a new movie without write access', async () => {
    const token = base64.encode(`${newUser2.username}:${newUser2.password}`);
    const response = await mockRequest.post('/signin').set('Authorization', `Basic ${token}`).send();
    const bearerToken = response.body.token;
    const getAllResponse = await mockRequest.post('/movies').set('Authorization', `Bearer ${bearerToken}`).send(newMovie);
    expect(getAllResponse.status).toEqual(500);
  });

  it('Adds music with write access', async () => {
    const token = base64.encode(`${newUser1.username}:${newUser1.password}`);
    const response = await mockRequest.post('/signin').set('Authorization', `Basic ${token}`).send();
    const bearerToken = response.body.token;
    const getAllResponse = await mockRequest.post('/music').set('Authorization', `Bearer ${bearerToken}`).send(newMusic);
    expect(getAllResponse.status).toEqual(201);
  });

  it('Denies access to adding music without write access', async () => {
    const token = base64.encode(`${newUser2.username}:${newUser2.password}`);
    const response = await mockRequest.post('/signin').set('Authorization', `Basic ${token}`).send();
    const bearerToken = response.body.token;
    const getAllResponse = await mockRequest.post('/music').set('Authorization', `Bearer ${bearerToken}`).send(newMusic);
    expect(getAllResponse.status).toEqual(500);
  });
});
