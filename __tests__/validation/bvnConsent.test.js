const AdjutorAPIClient = require('../../src/apiClient');

describe('Validation: Complete BVN Consent', () => {
  let client;

  beforeAll(() => {
    client = new AdjutorAPIClient();
  });

  test('TC-VALIDATION-001: This is meant to return BVN details with valid OTP', async () => {
    const bvn = '22123456789';
    const otp = '623553';
    const response = await client.completeBVNConsent(bvn, otp);
    
    expect(response.status).toBe(200);
    
    expect(response.data).toHaveProperty('status');
    expect(response.data.status).toBe('success');
    expect(response.data).toHaveProperty('data');
    expect(response.data.data).toHaveProperty('bvn');
    expect(response.data.data).toHaveProperty('first_name');
    expect(response.data.data).toHaveProperty('last_name');
  });

  test('TC-VALIDATION-002: This should return an error for invalid OTP', async () => {
    const response = await client.completeBVNConsent('22123456789', '000000');
    
    expect([400, 401, 422]).toContain(response.status);
    expect(response.data).toHaveProperty('message');
  });
});