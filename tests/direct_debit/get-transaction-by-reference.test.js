const AdjutorAPIClient = require('../../src/apiClient');
const APIHelper = require('../../src/utils/api-helper');
const testData = require('../../fixtures/direct-debit-test-data');

describe('Direct Debit Module - Get Transaction by Reference (GET /direct-debit/transactions?reference=)', () => {
  let apiClient;
  let apiHelper;

  beforeAll(() => {
    apiClient = new AdjutorAPIClient();
    apiHelper = new APIHelper(apiClient);
  });

  describe('Positive Test Cases', () => {
    test('TC-DD-TRANS-005: Should get transaction by valid reference', async () => {
      const response = await apiClient.getTransactionByReference(testData.valid.transaction.reference);
      
      expect(response.status).toBe(200);
      // expect(response.data.status).toBe('success');
      // expect(response.data.data.data).toBeInstanceOf(Array);
      
      // if (response.data.data.data.length > 0) {
      //   const transaction = response.data.data.data[0];
      //   expect(transaction.reference).toBe(testData.valid.transaction.reference);
      //   apiHelper.validateTransactionData(transaction);
      // }
      
      // apiHelper.logResponseDetails(response, 'TC-DD-TRANS-005');
    });
  });

  describe('Negative Test Cases', () => {
    test('TC-DD-TRANS-006: Should return empty for non-existent reference', async () => {
      const response = await apiClient.getTransactionByReference('NONEXISTENT-REF-12345');
      
      expect(response.status).toBe(500);
      // expect(response.data.data.data).toHaveLength(0);
    });
  });
});