const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('auth routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  const mockUser = {
    email: `this@${process.env.AUTHORIZED_DOMAIN}`,
    firstName: 'This',
    lastName: 'Iam',
    password: 'notagoodpassword',
  };

  const mockSecret = { title: 'meow meow', description: 'not a cat sound' };
  const mockSecretTwo = { title: 'Silver', description: 'sECRET Xe' };

  it('responds with a 401 status when a user is not logged in and tries to create a secret', async () => {
    const agent = request.agent(app);

    const res = await agent.post('/api/v1/secrets').send(mockSecret);

    expect(res.body).toEqual({
      status: 401,
      message: 'Please Sign In',
    });
  });

  it('allows a logged in user to create a secret', async () => {
    const agent = request.agent(app);

    await agent.post('/api/v1/users/').send(mockUser);
    await agent.post('/api/v1/users/sessions').send(mockUser);

    const res = await agent.post('/api/v1/secrets').send(mockSecret);

    expect(res.body).toEqual({
      ...mockSecret,
      id: expect.any(String),
      createdAt: expect.any(String),
    });
  });

  it('responds with a 401 status when a user is not logged in and tries to get all secrets', async () => {
    const agent = request.agent(app);

    const res = await agent.get('/api/v1/secrets');

    expect(res.body).toEqual({
      status: 401,
      message: 'Please Sign In',
    });
  });

  it('allows a logged in user to get all secrets', async () => {
    const agent = request.agent(app);

    await agent.post('/api/v1/users/').send(mockUser);
    await agent.post('/api/v1/users/sessions').send(mockUser);

    await agent.post('/api/v1/secrets').send(mockSecret);
    await agent.post('/api/v1/secrets').send(mockSecretTwo);
    const res = await agent.get('/api/v1/secrets');

    expect(res.body).toEqual([
      {
        ...mockSecret,
        id: expect.any(String),
        createdAt: expect.any(String),
      },
      {
        ...mockSecretTwo,
        id: expect.any(String),
        createdAt: expect.any(String),
      },
    ]);
  });
});
