'use strict';

const supertest = require('supertest');
const { app } = require('../../src/server');
const mockRequest = supertest(app);
const { db, users, movies, music } = require('../../src/models/index');
const base64 = require('base-64');

const newUser1 = {
  username: 'Joe',
  password: 'joepass',
  role: 'admin',
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
  await movies.create(newMovie);
  await music.create(newMusic);
});

afterAll(async () => {
  await db.drop();
  await db.close();
});

describe('Testing the GET methods/routes for getting all items with read access', () => {
  it('Gets all existing movies with read access', async () => {
    const token = base64.encode(`${newUser1.username}:${newUser1.password}`);
    const response = await mockRequest.post('/signin').set('Authorization', `Basic ${token}`).send();
    const bearerToken = response.body.token;
    const getAllResponse = await mockRequest.get('/movies').set('Authorization', `Bearer ${bearerToken}`).send();
    expect(getAllResponse.status).toEqual(200);
  });

  it('Denies access to getting all movies without read access', async () => {
    const getAllResponse = await mockRequest.get('/movies').set('Authorization', 'Bearer invalidBearerToken').send();
    expect(getAllResponse.status).toEqual(500);
  });

  it('Gets all existing music with read access', async () => {
    const token = base64.encode(`${newUser1.username}:${newUser1.password}`);
    const response = await mockRequest.post('/signin').set('Authorization', `Basic ${token}`).send();
    const bearerToken = response.body.token;
    const getAllResponse = await mockRequest.get('/music').set('Authorization', `Bearer ${bearerToken}`).send();
    expect(getAllResponse.status).toEqual(200);
  });

  it('Denies access to getting all music without read access', async () => {
    const getAllResponse = await mockRequest.get('/music').set('Authorization', 'Bearer invalidBearerToken').send();
    expect(getAllResponse.status).toEqual(500);
  });
});
