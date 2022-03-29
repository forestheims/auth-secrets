const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  const mockSecret = {
    title: 'The Secret Test',
    description: 'all secrets should be scrambled',
  };

  it('allows a logged in user to create a new secret', async () => {
    const res = await request(app).post('/api/v1/secrets').send(mockSecret);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...mockSecret,
      created_at: expect.any(String),
    });
  });
});
