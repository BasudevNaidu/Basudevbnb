const randomSuffix = () => `${Date.now()}_${Math.floor(Math.random() * 100000)}`;

const buildRandomUserPayload = () => ({
  name: 'Test User',
  email: `test_${randomSuffix()}@example.com`,
  password: 'password123'
});

module.exports = { buildRandomUserPayload };
