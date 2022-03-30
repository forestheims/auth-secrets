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
});
