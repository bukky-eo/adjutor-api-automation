const AdjutorAPIClient = require('../../src/apiClient');

describe('Credit Bureaus: FirstCentral Credit Report', () => {
  let client;
  let ACCESS_GRANTED = false;

  beforeAll(async () => {
    client = new AdjutorAPIClient();
    const probe = await client.getFirstCentralReport('22293381111');
    ACCESS_GRANTED = probe.status === 200;
    
    if (!ACCESS_GRANTED) {
      console.log('PERMISSION REQUIRED: Enable FirstCentral module for full testing\n');
    }
  });

  test('TC-FIRSTCENTRAL-001: Valid BVN returns credit report or permission error', async () => {
    const response = await client.getFirstCentralReport('22293381111');

    // Please note that these outcomes are valid depending on permissions of my apiKey
    const validStatuses = [200, 403];
    expect(validStatuses).toContain(response.status);
    
    if (response.status === 403) {
      expect(response.data.message).toMatch(/permission|access denied/i);
    }
  });

  test('TC-FIRSTCENTRAL-002: Invalid BVN returns appropriate error', async () => {
    const response = await client.getFirstCentralReport('invalid');
        // This is me documenting actual behavior vs expected

    const acceptableStatuses = ACCESS_GRANTED ? [400, 404] : [403, 500];
    expect(acceptableStatuses).toContain(response.status);
  });
});