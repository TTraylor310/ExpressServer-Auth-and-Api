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
  role: 'editor',
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

describe('Testing the /delete routes', () => {
  it('Deletes an existing movie with delete access', async () => {
    const token = base64.encode(`${newUser1.username}:${newUser1.password}`);
    const response = await mockRequest.post('/signin').set('Authorization', `Basic ${token}`).send();
    const bearerToken = response.body.token;
    const deleteResponse = await mockRequest.delete('/movies/1').set('Authorization', `Bearer ${bearerToken}`).send();
    expect(deleteResponse.status).toEqual(200);
  });

  it('Does not allow deleting a movie without delete access', async () => {
    const token = base64.encode(`${newUser2.username}:${newUser2.password}`);
    const response = await mockRequest.post('/signin').set('Authorization', `Basic ${token}`).send();
    const bearerToken = response.body.token;
    const deleteResponse = await mockRequest.delete('/movies/1').set('Authorization', `Bearer ${bearerToken}`).send();
    expect(deleteResponse.status).toEqual(500);
  });

  it('Deletes an existing music record with delete access', async () => {
    const token = base64.encode(`${newUser1.username}:${newUser1.password}`);
    const response = await mockRequest.post('/signin').set('Authorization', `Basic ${token}`).send();
    const bearerToken = response.body.token;
    const deleteResponse = await mockRequest.delete('/music/1').set('Authorization', `Bearer ${bearerToken}`).send();
    expect(deleteResponse.status).toEqual(200);
  });

  it('Does not allow deleting music record without delete access', async () => {
    const token = base64.encode(`${newUser2.username}:${newUser2.password}`);
    const response = await mockRequest.post('/signin').set('Authorization', `Basic ${token}`).send();
    const bearerToken = response.body.token;
    const deleteResponse = await mockRequest.delete('/music/1').set('Authorization', `Bearer ${bearerToken}`).send();
    expect(deleteResponse.status).toEqual(500);
  });
});
