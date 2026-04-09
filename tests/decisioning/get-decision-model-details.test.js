const AdjutorAPIClient = require('../../apiClient');
const APIHelper = require('../utils/api-helper');
const testConfig = require('../config/test.config');
const testData = require('../fixtures/decisioning-test-data');

describe('Decisioning Module - Get Decision Model Details (GET /decisioning/models/:id/settings)', () => {
  let apiClient;
  let apiHelper;

  beforeAll(() => {
    apiClient = new AdjutorAPIClient();
    apiHelper = new APIHelper(apiClient);
  });

  describe('Positive Test Cases', () => {
    test('TC-DEC-DETAILS-001: Should fetch model details for valid ID', async () => {
      const modelId = 1;
      const response = await apiClient.getDecisionModelDetails(modelId);
      
      expect(response.status).toBe(200);
      
      // apiHelper.logResponseDetails(response, 'TC-DEC-DETAILS-001');
    });
  });

  describe('Negative Test Cases', () => {
    test.each(testData.invalid.modelIds)('TC-DEC-DETAILS-002: Invalid model ID - $description', async ({ id, expectedCode }) => {
      const response = await apiClient.getDecisionModelDetails(id);
      
      expect(response.status).toBe(500);
    });
  });
});