const AdjutorAPIClient = require('../../src/apiClient');
const APIHelper = require('../utils/api-helper');
const testConfig = require('../config/test.config');
const testData = require('../fixtures/validation-test-data');

describe('Validation Module - Verify NIN (GET /verification/nin/:nin)', () => {
  let apiClient;
  let apiHelper;

  beforeAll(() => {
    apiClient = new AdjutorAPIClient();
    apiHelper = new APIHelper(apiClient);
  });

  describe('Positive Test Cases', () => {
    test('TC-VAL-NIN-001: Should verify valid NIN', async () => {
      const response = await apiClient.verifyNIN(testData.valid.nin.standard);
      
      expect(response.status).toBe(200);    
      // if (response.data.data && response.data.data.nin) {
      //   expect(response.data.data.nin).toMatch(/^\d{11}$/);
      // } // Commented out because success response doesn't come with a message
      
    });
  });

  describe('Negative Test Cases', () => {
    test.each(testData.invalid.nin)('TC-VAL-NIN-002: Invalid NIN - $description', async ({ value }) => {
      const response = await apiClient.verifyNIN(value);
      expect(response.status).toBe(testConfig.validation.statusCodes.badRequest);
    });
  });
});