const AdjutorAPIClient = require('../../apiClient');
const APIHelper = require('../utils/api-helper');
const testConfig = require('../config/test.config');

describe('Decisioning Module - Get Decision Models (GET /decisioning/models)', () => {
  let apiClient;
  let apiHelper;

  beforeAll(() => {
    apiClient = new AdjutorAPIClient();
    apiHelper = new APIHelper(apiClient);
  });

  describe('Positive Test Cases', () => {
    test('TC-DEC-MODELS-001: Should fetch decision models successfully', async () => {
      const response = await apiClient.getDecisionModels();      
      expect(response.status).toBe(200);
      
      // apiHelper.logResponseDetails(response, 'TC-DEC-MODELS-001');
    });

    test('TC-DEC-MODELS-002: Should handle response even without data', async () => {
      const response = await apiClient.getDecisionModels();
      
      expect(response.status).toBe(200);
      expect(response.status).toBeDefined();
    });
  });
});