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

const newUser2 = {
  username: 'Bob',
  password: 'bobpass',
  role: 'writer',
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
  await movies.create(newMovie);
  await music.create(newMusic);
});

afterAll(async () => {
  await db.drop();
  await db.close();
});

describe('Testing the PUT methods/routes for updating an item by id with update access', () => {
  it('Updates a movie with update access', async () => {
    const token = base64.encode(`${newUser1.username}:${newUser1.password}`);
    const response = await mockRequest.post('/signin').set('Authorization', `Basic ${token}`).send();
    const bearerToken = response.body.token;
    const getAllResponse = await mockRequest.put('/movies/1').set('Authorization', `Bearer ${bearerToken}`).send({ title: 'Die Hard'});
    expect(getAllResponse.status).toEqual(200);
  });

  it('Denies access to updating a movie without update access', async () => {
    const token = base64.encode(`${newUser2.username}:${newUser2.password}`);
    const response = await mockRequest.post('/signin').set('Authorization', `Basic ${token}`).send();
    const bearerToken = response.body.token;
    const getAllResponse = await mockRequest.put('/movies/1').set('Authorization', `Bearer ${bearerToken}`).send({ year: 1992 });
    expect(getAllResponse.status).toEqual(500);
  });

  it('Updates music by id with update access', async () => {
    const token = base64.encode(`${newUser1.username}:${newUser1.password}`);
    const response = await mockRequest.post('/signin').set('Authorization', `Basic ${token}`).send();
    const bearerToken = response.body.token;
    const getAllResponse = await mockRequest.put('/music/1').set('Authorization', `Bearer ${bearerToken}`).send({ song: 'Scorpion' });
    expect(getAllResponse.status).toEqual(200);
  });

  it('Denies access to updating music by id without update access', async () => {
    const token = base64.encode(`${newUser2.username}:${newUser2.password}`);
    const response = await mockRequest.post('/signin').set('Authorization', `Basic ${token}`).send();
    const bearerToken = response.body.token;
    const getAllResponse = await mockRequest.put('/music/1').set('Authorization', `Bearer ${bearerToken}`).send({ artist: 'Drake' });
    expect(getAllResponse.status).toEqual(500);
  });
});
