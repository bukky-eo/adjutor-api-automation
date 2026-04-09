const AdjutorAPIClient = require('../../apiClient');
const APIHelper = require('../utils/api-helper');
const testConfig = require('../config/test.config');

describe('Direct Debit Module - Get All Transactions (GET /direct-debit/transactions)', () => {
  let apiClient;
  let apiHelper;

  beforeAll(() => {
    apiClient = new AdjutorAPIClient();
    apiHelper = new APIHelper(apiClient);
  });

  describe('Positive Test Cases', () => {
    test('TC-DD-TRANS-001: Should get all transactions with default pagination', async () => {
      const response = await apiClient.getTransactions();
      
      expect(testConfig.directDebit.statusCodes.success).toContain(response.status);
      expect(response.data.status).toBe('success');
      expect(response.data.data).toBeDefined();
      expect(response.data.data.data).toBeInstanceOf(Array);
      
      if (response.data.data.data.length > 0) {
        apiHelper.validateTransactionData(response.data.data.data[0]);
      }
      
      apiHelper.logResponseDetails(response, 'TC-DD-TRANS-001');
    });

    test('TC-DD-TRANS-002: Should support custom pagination', async () => {
      const response = await apiClient.getTransactions({ limit: 5, page: 1 });
      
      expect(response.status).toBe(200);
      expect(response.data.data.data.length).toBeLessThanOrEqual(5);
    });
  });

  describe('Data Validation', () => {
    test('TC-DD-TRANS-003: All transactions should have valid statuses', async () => {
      const response = await apiClient.getTransactions({ limit: 50 });
      
      const validStatuses = ['successful', 'pending', 'failed', 'reversed'];
      response.data.data.data.forEach(transaction => {
        expect(validStatuses).toContain(transaction.status);
      });
    });

    test('TC-DD-TRANS-004: Transaction amounts should be valid', async () => {
      const response = await apiClient.getTransactions({ limit: 50 });
      
      response.data.data.data.forEach(transaction => {
        expect(parseFloat(transaction.amount)).toBeGreaterThan(0);
      });
    });
  });
});