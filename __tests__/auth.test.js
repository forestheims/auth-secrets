const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
});
