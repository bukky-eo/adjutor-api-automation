const AdjutorAPIClient = require('../../src/apiClient');
describe('Validation: Verify Customer NIN', () => {
  let client;

  beforeAll(() => {
    client = new AdjutorAPIClient();
  });

  test('TC-NIN-001: It should return NIN details for valid NIN', async () => {
    const nin = '70123456789';
    const response = await client.verifyNIN(nin);
    
    expect(response.status).toBe(200);    
    expect(response.data).toHaveProperty('status');
    expect(response.data.status).toBe('success');
    expect(response.data.data).toHaveProperty('nin');
    expect(response.data.data).toHaveProperty('first_name');
    expect(response.data.data).toHaveProperty('last_name');
  });

  test('TC-NIN-002: It should return error for invalid NIN format', async () => {
    const response = await client.verifyNIN('12345');
    
    expect([400, 404]).toContain(response.status);
    expect(response.data).toHaveProperty('message');
  });
});