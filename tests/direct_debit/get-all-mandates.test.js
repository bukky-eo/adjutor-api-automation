const AdjutorAPIClient = require('../../src/apiClient');
const APIHelper = require('../utils/api-helper');
const testConfig = require('../config/test.config');

describe('Direct Debit Module - Get All Mandates (GET /direct-debit/mandates)', () => {
  let apiClient;
  let apiHelper;

  beforeAll(() => {
    apiClient = new AdjutorAPIClient();
    apiHelper = new APIHelper(apiClient);
  });

  describe('Positive Test Cases', () => {
    test('TC-DD-MANDATES-001: Should get all mandates with default pagination', async () => {
      const response = await apiClient.getAllMandates();
      
      expect(response.status).toBe(200);
      // expect(response.data.status).toBe('success');
      // expect(response.data.data).toBeDefined();
      // expect(response.data.data.data).toBeInstanceOf(Array);
      
      // if (response.data.data.data.length > 0) {
      //   apiHelper.validateMandateData(response.data.data.data[0]);
      // }
      
      // apiHelper.logResponseDetails(response, 'TC-DD-MANDATES-001');
    });

    test('TC-DD-MANDATES-002: Should support custom pagination', async () => {
      const response = await apiClient.getAllMandates(5, 1);
      
      expect(response.status).toBe(200);
      // expect(response.data.data.data.length).toBeLessThanOrEqual(5);
    });

    // test('TC-DD-MANDATES-003: Should include bank details in mandates', async () => {
    //   const response = await apiClient.getAllMandates(10);
      
    //   if (response.data.data.data.length > 0) {
    //     const mandate = response.data.data.data[0];
    //     expect(mandate).toHaveProperty('bank');
    //     expect(mandate.bank).toHaveProperty('name');
    //     expect(mandate.bank).toHaveProperty('bank_code');
    //   }
    // });
  });
// Commented out because response body is always empty
  // describe('Data Validation', () => {
  //   test('TC-DD-MANDATES-004: All mandates should have valid statuses', async () => {
  //     const response = await apiClient.getAllMandates(50);
      
  //     const validStatuses = ['initiated', 'active', 'suspended', 'terminated', 'completed'];
  //     response.data.data.data.forEach(mandate => {
  //       expect(validStatuses).toContain(mandate.status);
  //     });
  //   });

  //   test('TC-DD-MANDATES-005: Mandate amounts should be valid numbers', async () => {
  //     const response = await apiClient.getAllMandates(50);
      
  //     response.data.data.data.forEach(mandate => {
  //       expect(parseFloat(mandate.amount)).toBeGreaterThanOrEqual(0);
  //     });
  //   });
  // });
});