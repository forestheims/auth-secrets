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
    email: 'this@users.email',
    firstName: 'This',
    lastName: 'Iam',
    password: 'notagoodpassword',
  };

  const mockSecret = { title: 'meow meow', description: 'not a cat sound' };

  it('responds with a 403 status when a user is not logged in and tries to create a secret', async () => {
    const agent = request.agent(app);

    const res = await agent.post('/api/v1/secrets').send(mockSecret);

    expect(res.body).toEqual({
      status: 403,
      message: 'Please Sign In',
    });
  });

  it('allows a logged in user to create a secret', async () => {
    const agent = request.agent(app);

    await UserService.create(mockUser);
    await UserService.signIn(mockUser);

    const res = await agent.post('/api/v1/secrets').send(mockSecret);

    expect(res.body).toEqual({
      ...mockSecret,
      id: expect.any(String),
      created_at: expect.any(String),
    });
  });
});
