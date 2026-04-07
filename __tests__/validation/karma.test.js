const AdjutorAPIClient = require('../../src/apiClient');

describe('Validation: Karma Lookup (Blacklist Check)', () => {
  let client;

  beforeAll(() => {
    client = new AdjutorAPIClient();
  });
  const testData = require('../fixtures/testData');

  test('TC-KARMA-001: Return blacklist status for valid phone number', async () => {
    const response = await client.checkKarma(testData.validation.karmaPhone);
    

    expect(response.status).toBe(200);
    
    expect(response.data).toHaveProperty('status');
    expect(response.data.status).toBe('success');
    expect(response.data).toHaveProperty('data');
    
    // Since Karma response should always indicate if blacklisted or not
    if (response.data.data) {
      expect(response.data.data).toHaveProperty('blacklisted');
    }
  });

  test('TC-KARMA-002: Return blacklist status for valid email', async () => {
    const response = await client.checkKarma(testData.validation.karmaEmail);
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('status');
    expect(response.data.status).toBe('success');
  });

  test('TC-KARMA-003: Return blacklist status for valid BVN', async () => {
   const response = await client.checkKarma(testData.validation.validBVN);
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('status');
    expect(response.data.status).toBe('success');
  });

  test('TC-KARMA-004: Return error for invalid identifier format', async () => {
    const response = await client.checkKarma('invalid@');
    
    expect([400, 404]).toContain(response.status);
    expect(response.data).toHaveProperty('message');
  });

  test('TC-KARMA-005: Return error for empty identifier', async () => {
    const response = await client.checkKarma('');
    
    expect([400, 404]).toContain(response.status);
  });
});