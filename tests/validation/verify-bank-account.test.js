const AdjutorAPIClient = require('../../src/apiClient');
const APIHelper = require('../../src/utils/api-helper');
const testData = require('../../fixtures/validation-test-data');

describe('Validation Module - Verify Bank Account (POST /verification/bankaccount/bvn)', () => {
  let apiClient;
  let apiHelper;

  beforeAll(() => {
    apiClient = new AdjutorAPIClient();
    apiHelper = new APIHelper(apiClient);
  });

  describe('Positive Test Cases', () => {
    test('TC-VAL-BANK-001: Should verify valid bank account', async () => {
      const response = await apiClient.verifyBankAccount({
        account_number: testData.valid.bankAccount.standard.accountNumber,
        bank_code: testData.valid.bankAccount.standard.bankCode
      });
      
      expect(response.status).toBe(200);
    });
  });

  describe('Negative Test Cases', () => {
    test.each(testData.invalid.bankAccount)('TC-VAL-BANK-002: $description', async ({ data }) => {
      const response = await apiClient.verifyBankAccount(data);
      expect(response.status).toBe(500);
    });
  });
});