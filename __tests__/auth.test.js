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

  it('creates a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'this@users.email',
      firstName: 'This',
      lastName: 'Iam',
    });
  });

  it('logs in a user', async () => {
    await UserService.create(mockUser);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send(mockUser);
    expect(res.body).toEqual({
      message: 'Sign In Succesful!',
    });
  });

  it('logs out a user', async () => {
    const agent = request.agent(app);
    await UserService.create(mockUser);
    await UserService.signIn(mockUser);
    const res = await agent.delete('/api/v1/users/sessions');
    expect(res.body).toEqual({ success: true, message: 'Log Out Successful!' });
  });
});
