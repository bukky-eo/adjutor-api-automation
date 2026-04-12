const AdjutorAPIClient = require('../../src/apiClient');
const testData = require('../../fixtures/validation-test-data');

describe('Validation Module - Complete BVN Consent', () => {
  let apiClient;

  beforeAll(() => {
    apiClient = new AdjutorAPIClient();
    retryHandler = new RetryHandler({
      maxRetries: testConfig.api.retryAttempts,
      baseDelay: testConfig.api.retryDelay
    });
    rateLimiter = retryHandler.createRateLimiter(testConfig.rateLimit.requestsPerSecond);
  });

  describe('Positive Test Cases', () => {
    test('TC-VAL-COMP-BVN-001: Should complete consent with valid BVN and OTP', async () => {
      const response = await apiClient.completeBVNConsent(
        testData.valid.bvn.alternative,
        testData.valid.otp.valid
      );
      
      expect(response.status).toBe(200);

    });
  });

  describe('Negative Test Cases', () => {
    test('TC-VAL-COMP-BVN-002: Should return 500 for invalid OTP', async () => {
      const response = await apiClient.completeBVNConsent(
        testData.valid.bvn.alternative,
        '000000'
      );
      
      expect(response.status).toBe(500);
      expect(response.data.status).toBe('error');
    });

    test('TC-VAL-COMP-BVN-003: Should return 500 for missing OTP', async () => {
      const response = await apiClient.completeBVNConsent(
        testData.valid.bvn.alternative,
        ''
      );
      
      expect(response.status).toBe(500);
    });

    test('TC-VAL-COMP-BVN-004: Should return 500 for invalid BVN', async () => {
      const response = await apiClient.completeBVNConsent(
        '123',
        testData.valid.otp.valid
      );
      
      expect(response.status).toBe(500);
    });
    test('TC-VAL-COMP-BVN-005: Should return 500 for null OTP', async () => {
      const response = await apiClient.completeBVNConsent(
        testData.valid.bvn.alternative,
        null
      );
      expect(response.status).toBe(500);
    });
  });
});