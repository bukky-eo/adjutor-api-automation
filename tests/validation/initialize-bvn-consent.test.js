const AdjutorAPIClient = require('../../src/apiClient');
const APIHelper = require('../utils/api-helper');
const RetryHandler = require('../utils/retry-handler');
const testConfig = require('../config/test.config');
const testData = require('../fixtures/validation-test-data');

describe('Validation Module - Initialize BVN Consent (POST /verification/bvn/:bvn)', () => {
  let apiClient;
  let apiHelper;
  let retryHandler;
  let rateLimiter;
  const testContext = 'InitializeBVNConsent';

  beforeAll(() => {
    apiClient = new AdjutorAPIClient();
    apiHelper = new APIHelper(apiClient);
    retryHandler = new RetryHandler({
      maxRetries: testConfig.api.retryAttempts,
      baseDelay: testConfig.api.retryDelay
    });
    rateLimiter = retryHandler.createRateLimiter(testConfig.rateLimit.requestsPerSecond);
  });

  describe('Positive Test Cases', () => {
    test('TC-VAL-BVN-001: Should initialize consent with valid BVN and phone contact', async () => {
      const response = await rateLimiter(async () => {
        return retryHandler.executeWithRetry(
          () => apiClient.initializeBVNConsent(
            testData.valid.bvn.standard,
            testData.valid.contact.phone
          ),
          testContext
        );
      });

      expect(response.status).toBe(200);
    });

  });

  describe('Negative Test Cases', () => {
    test.each(testData.invalid.bvn)(
      'TC-VAL-BVN-002: Should return 500 for invalid BVN - $description',
      async ({ value }) => {
        const response = await apiClient.initializeBVNConsent(value, testData.valid.contact.phone);
        expect(response.status).toBe(500);
        expect(response.data).toHaveProperty('message');

        //Any bvn even invalid returns 200, this is an error in the API. It should return 500 for invalid BVN
      }
    );

    test.each(testData.invalid.contact)(
      'TC-VAL-BVN-003: Should return 500 for invalid contact format - $description',
      async ({ value }) => {
        const response = await apiClient.initializeBVNConsent(testData.valid.bvn.standard, value);
        expect(response.status).toBe(500);
        expect(response.data).toHaveProperty('message');
        //This returns 200 thats an error
      }
    );

    test('TC-VAL-BVN-004: Should return 500 for missing contact', async () => {
      const response = await apiClient.initializeBVNConsent(testData.valid.bvn.standard, null);
      
      expect(response.status).toBe(500);
      expect(response.data).toHaveProperty('message');
    });

    test('TC-VAL-BVN-005: Should return 500 for empty contact', async () => {
      const response = await apiClient.initializeBVNConsent(testData.valid.bvn.standard, '');
      
      expect(response.status).toBe(500);
      expect(response.data).toHaveProperty('message');
    });

    test('TC-VAL-BVN-006: Should return 500 for undefined contact', async () => {
      const response = await apiClient.initializeBVNConsent(testData.valid.bvn.standard, undefined);
      
      expect(response.status).toBe(500);
      expect(response.data).toHaveProperty('message');
      //This returns 200
    });
  });

  describe('Edge Cases', () => {
    test('TC-VAL-BVN-007: Should handle BVN with whitespace', async () => {
      const response = await apiClient.initializeBVNConsent(
        `  ${testData.valid.bvn.standard}  `,
        testData.valid.contact.phone
      );
      expect(response.status).toBe(500);
      expect(response.data).toHaveProperty('message');
    });

    test('TC-VAL-BVN-008: Should handle contact with special characters', async () => {
      const response = await apiClient.initializeBVNConsent(
        testData.valid.bvn.standard,
        '!@#$%^&*()'
      );
      expect(response.status).toBe(500);
      expect(response.data).toHaveProperty('message');
      // Error here this returns 200
    });
  });
});