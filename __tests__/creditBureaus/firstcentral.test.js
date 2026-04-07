const AdjutorAPIClient = require('../../src/apiClient');

describe('Credit Bureaus: FirstCentral Credit Report', () => {
  let client;

  beforeAll(() => {
    client = new AdjutorAPIClient();
  });

  test('TC-FIRSTCENTRAL-001: Should return credit report for valid BVN', async () => {
    const bvn = '22293381111';
    const response = await client.getFirstCentralReport(bvn);
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('status');
    expect(response.data.status).toBe('success');
  });

  test('TC-FIRSTCENTRAL-002: Should return error for invalid BVN', async () => {
    const response = await client.getFirstCentralReport('invalid');
    
    expect([400, 404]).toContain(response.status);
  });
});