const AdjutorAPIClient = require('../../src/apiClient');
const APIHelper = require('../utils/api-helper');
const RetryHandler = require('../utils/retry-handler');
const testConfig = require('../config/test.config');
const testData = require('../fixtures/direct-debit-test-data');

describe('Direct Debit Module - Create Mandate (POST /direct-debit/mandates)', () => {
  let apiClient;
  let apiHelper;
  let retryHandler;

  beforeAll(() => {
    apiClient = new AdjutorAPIClient();
    apiHelper = new APIHelper(apiClient);
    retryHandler = new RetryHandler();
  });

  describe('Positive Test Cases', () => {
    test('TC-DD-MANDATE-001: Should create standard emandate', async () => {
      const response = await retryHandler.executeWithRetry(
        () => apiClient.createMandate(testData.valid.mandate.standard),
        'CreateMandate'
      );
      
      expect(response.status).toBe(200);
      // expect(response.data.status).toBe('success');
      // expect(response.data.message).toMatch(/created successfully/i);
      // expect(response.data.data).toHaveProperty('id');
      // expect(response.data.data).toHaveProperty('reference_number');
      // expect(response.data.data).toHaveProperty('session_id');
      // expect(response.data.data.status).toBe('initiated');
      
      // apiHelper.logResponseDetails(response, 'TC-DD-MANDATE-001');
    });

    test('TC-DD-MANDATE-002: Should create partial debit mandate', async () => {
      const response = await apiClient.createMandate(testData.valid.mandate.partial);
      
      expect(response.status).toBe(200);
    });

    test('TC-DD-MANDATE-003: Should create manual mandate', async () => {
      const response = await apiClient.createMandate(testData.valid.mandate.manual);
      
      expect(response.status).toBe(200);
   
    });

    // test('TC-DD-MANDATE-004: Should generate activation instructions', async () => {
    //   const response = await apiClient.createMandate(testData.valid.mandate.standard);
      
    //   expect(response.data.data).toHaveProperty('activation_instruction');
    //   expect(typeof response.data.data.activation_instruction).toBe('string');
    //   expect(response.data.data.activation_instruction.length).toBeGreaterThan(0);
    // });
  });

  describe('Field Validation Tests', () => {
    // test('TC-DD-MANDATE-005: Should validate required fields', async () => {
    //   const requiredFields = ['account_number', 'phone_number', 'bank_code', 'email', 'amount', 'type'];
      
    //   for (const field of requiredFields) {
    //     const payload = { ...testData.valid.mandate.standard };
    //     delete payload[field];
        
    //     const response = await apiClient.createMandate(payload);
    //     expect(response).toContain(500);
    //   }
    // });

    test('TC-DD-MANDATE-006: Should validate amount is positive number', async () => {
      const payload = { ...testData.valid.mandate.standard, amount: -100 };
      const response = await apiClient.createMandate(payload);
      
      expect(response.status).toContain(500);
    });

    test('TC-DD-MANDATE-007: Should validate date formats', async () => {
      const payload = { ...testData.valid.mandate.standard, start_date: 'invalid-date' };
      const response = await apiClient.createMandate(payload);
      
      expect(response.status).toContain(500);
    });
  });

  describe('Negative Test Cases', () => {
    test.each(testData.invalid.mandatePayloads)('TC-DD-MANDATE-008: $description', async ({ data}) => {
      const response = await apiClient.createMandate(data);
      expect(response.status).toContain(500);
    });

    test('TC-DD-MANDATE-009: Should handle duplicate mandate', async () => {
      await apiClient.createMandate(testData.valid.mandate.standard);
      const duplicateResponse = await apiClient.createMandate(testData.valid.mandate.standard);
      
      expect(response.status).toContain(500);
    });
  });
});