const AdjutorAPIClient = require('../../src/apiClient');

describe('Credit Bureaus: CRC Credit Report', () => {
  let client;

  beforeAll(() => {
    client = new AdjutorAPIClient();
  });

  test('TC-CRC-001: Should return credit report for valid BVN', async () => {
    const bvn = '22293381111';
    const response = await client.getCRCReport(bvn);
    
    expect(response.status).toBe(200);
    
    expect(response.data).toHaveProperty('status');
    expect(response.data.status).toBe('success');
    expect(response.data).toHaveProperty('data');
  });

  test('TC-CRC-002: Should handle invalid BVN gracefully', async () => {
    const response = await client.getCRCReport('00000000000');
    
    expect([400, 404, 422]).toContain(response.status);
  });
});