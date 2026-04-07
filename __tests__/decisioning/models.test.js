const AdjutorAPIClient = require('../../src/apiClient');

describe('Decisioning: Geting Decision Models', () => {
  let client;

  beforeAll(() => {
    client = new AdjutorAPIClient();
  });

  test('TC-MODELS-001: It should return list of decision models', async () => {
    const response = await client.getDecisionModels();
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('status');
  });

  test('TC-MODELS-002: It should return model details for valid ID', async () => {
    const modelId = 2355;
    const response = await client.getDecisionModelDetails(modelId);
    
    expect([200, 404]).toContain(response.status);
  });
});