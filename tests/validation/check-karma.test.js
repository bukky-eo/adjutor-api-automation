const AdjutorAPIClient = require('../../apiClient');
const APIHelper = require('../../src/utils/api-helper');
const testData = require('../../fixtures/validation-test-data');

describe('Validation Module - Check Karma (GET /verification/karma/:identity)', () => {
  let apiClient;
  let apiHelper;

  beforeAll(() => {
    apiClient = new AdjutorAPIClient();
    apiHelper = new APIHelper(apiClient);
  });

  describe('Positive Test Cases', () => {
    test('TC-VAL-KARMA-001: Should check karma for domain identity', async () => {
      const response = await apiClient.checkKarma(testData.valid.karmaIdentity.domain);
      
      expect(response.status).toBe(200);
    });

    test('TC-VAL-KARMA-002: Should check karma for email identity', async () => {
      const response = await apiClient.checkKarma(testData.valid.karmaIdentity.email);
      expect(response.status).toBe(200);
    });

    test('TC-VAL-KARMA-003: Should check karma for phone identity', async () => {
      const response = await apiClient.checkKarma(testData.valid.karmaIdentity.phone);
      expect(response.status).toBe(200);
    });

    test('TC-VAL-KARMA-004: Should check karma for BVN identity', async () => {
      const response = await apiClient.checkKarma(testData.valid.karmaIdentity.bvn);
      expect(response.status).toBe(200);
    });
  });

  describe('Negative Test Cases', () => {
    test.each(testData.invalid.karmaIdentity)('TC-VAL-KARMA-005: $description', async ({ value }) => {
      const response = await apiClient.checkKarma(value);
      expect(response.status).toContain(500);
    });
  });
});