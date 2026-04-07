const AdjutorAPIClient = require('../../src/apiClient');

describe('Direct Debit: Banks Module', () => {
  let client;

  beforeAll(() => {
    client = new AdjutorAPIClient();
  });

  test('TC-DD-BANKS-001: This should return list of Nigerian banks', async () => {
    const response = await client.getAllBanks();
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('status');
    expect(response.data.status).toBe('success');
    expect(response.data.data).toHaveProperty('data');
    expect(Array.isArray(response.data.data.data)).toBe(true);
  });

  test('TC-DD-BANKS-002: It should have bank with code, name, and institution_code', async () => {
    const response = await client.getAllBanks(10, 1, 'ASC');
    
    expect(response.status).toBe(200);
    if (response.data.data.data && response.data.data.data.length > 0) {
      const firstBank = response.data.data.data[0];
      expect(firstBank).toHaveProperty('bank_code');
      expect(firstBank).toHaveProperty('name');
      expect(firstBank).toHaveProperty('institution_code');
    }
  });

  test('TC-DD-BANKS-003: This should respect pagination parameters', async () => {
    const response = await client.getAllBanks(5, 1, 'ASC');
    
    expect(response.status).toBe(200);
    expect(response.data.data.meta).toHaveProperty('page_size');
    expect(parseInt(response.data.data.meta.page_size)).toBe(5);
  });
});