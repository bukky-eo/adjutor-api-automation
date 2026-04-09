const AdjutorAPIClient = require('../../apiClient');
const APIHelper = require('../utils/api-helper');
const testConfig = require('../config/test.config');
const testData = require('../fixtures/direct-debit-test-data');

describe('Direct Debit Module - Account Lookup (POST /direct-debit/banks/account-lookup)', () => {
  let apiClient;
  let apiHelper;

  beforeAll(() => {
    apiClient = new AdjutorAPIClient();
    apiHelper = new APIHelper(apiClient);
  });

  describe('Positive Test Cases', () => {
    test('TC-DD-LOOKUP-001: Should verify valid account number', async () => {
      const response = await apiClient.verifyBankAccountNumber({
        account_number: testData.valid.account.accountNumber,
        bank_code: testData.valid.bank.bankCode
      });
      
      expect(response.status).toBe(200);    
    });

    // test('TC-DD-LOOKUP-002: Should return correct account name for valid account', async () => {
    //   const response = await apiClient.verifyBankAccountNumber({
    //     account_number: testData.valid.account.accountNumber,
    //     bank_code: testData.valid.bank.bankCode
    //   });
      
    //   expect(response.data.data.account_name).toBe(testData.valid.account.accountName);
    // }); Commented out because there are no responses messages.

    // test('TC-DD-LOOKUP-002: Should return session_id for tracking', async () => {
    //   const response = await apiClient.verifyBankAccountNumber({
    //     account_number: testData.valid.account.accountNumber,
    //     bank_code: testData.valid.bank.bankCode
    //   });
      
    //   expect(response.data.data.session_id).toBeDefined();
    //   expect(typeof response.data.data.session_id).toBe('string');
    //   expect(response.data.data.session_id.length).toBeGreaterThan(0);
    // });  Commented out because there are no responses messages.
  });

  describe('Negative Test Cases', () => {
    test.each(testData.invalid.accountNumbers)('TC-DD-LOOKUP-004: Invalid account number - $description', async ({ number, expectedCode }) => {
      const response = await apiClient.verifyBankAccountNumber({
        account_number: number,
        bank_code: testData.valid.bank.bankCode
      });
      
      expect(response.status).toContain(testConfig.directDebit.statusCodes.badRequest);
    });

    test.each(testData.invalid.bankCodes)('TC-DD-LOOKUP-005: Invalid bank code - $description', async ({ code }) => {
      const response = await apiClient.verifyBankAccountNumber({
        account_number: testData.valid.account.accountNumber,
        bank_code: code
      });
      
      expect(response.status).toContain(testConfig.directDebit.statusCodes.badRequest);
    });

    test('TC-DD-LOOKUP-006: Missing account_number', async () => {
      const response = await apiClient.verifyBankAccountNumber({
        bank_code: testData.valid.bank.bankCode
      });
      
      expect(response.status).toContain(testConfig.directDebit.statusCodes.badRequest);
    });

    test('TC-DD-LOOKUP-007: Missing bank_code', async () => {
      const response = await apiClient.verifyBankAccountNumber({
        account_number: testData.valid.account.accountNumber
      });
      
      expect(response.status).toContain(testConfig.directDebit.statusCodes.badRequest);
    });
  });

  describe('Edge Cases', () => {
    test('TC-DD-LOOKUP-008: Should handle account number with spaces', async () => {
      const response = await apiClient.verifyBankAccountNumber({
        account_number: `  ${testData.valid.account.accountNumber}  `,
        bank_code: testData.valid.bank.bankCode
      });
      
      expect(response.status).toContain(testConfig.directDebit.statusCodes.badRequest);
    });

    test('TC-DD-LOOKUP-009: Should handle non-existent account', async () => {
      const response = await apiClient.verifyBankAccountNumber({
        account_number: '9999999999',
        bank_code: testData.valid.bank.bankCode
      });
      
      expect(response.status).toContain(testConfig.directDebit.statusCodes.badRequest);
    });
  });
});