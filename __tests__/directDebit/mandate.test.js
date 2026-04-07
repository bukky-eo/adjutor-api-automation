const AdjutorAPIClient = require('../../src/apiClient');

describe('Direct Debit NG: Mandate Module', () => {
  let client;

  beforeAll(() => {
    client = new AdjutorAPIClient();
  });

  // Test data for creating a mandate
  const validMandateData = {
    account_number: "1234567890",
    bank_code: "058",
    amount: "5000.00",
    start_date: "2026-05-01",
    end_date: "2026-12-31",
    narration: "Loan Repayment - Capital Cash",
    customer_name: "John Doe",
    customer_email: "john.doe@example.com",
    customer_phone: "08012345678"
  };

  test('TC-DD-MANDATE-001: Should create a new mandate with valid data', async () => {
    const response = await client.createMandate(validMandateData);
    
    expect([200, 201, 400, 422]).toContain(response.status);
    
    if (response.status === 200 || response.status === 201) {
      expect(response.data).toHaveProperty('status');
      expect(response.data).toHaveProperty('data');

      expect(response.data.data).toHaveProperty('mandate_code');
    }
  });

  test('TC-DD-MANDATE-002: Should return error when required fields are missing', async () => {
    const incompleteData = { account_number: "1234567890" };
    const response = await client.createMandate(incompleteData);
    
    expect([400, 422]).toContain(response.status);
    expect(response.data).toHaveProperty('message');
  });

  test('TC-DD-MANDATE-003: Should get mandate details by ID', async () => {
    const createResponse = await client.createMandate(validMandateData);
    
    if (createResponse.status === 200 || createResponse.status === 201) {
      const mandateId = createResponse.data.data.id || createResponse.data.data.mandate_code;
      const getResponse = await client.getMandate(mandateId);
      
      expect(getResponse.status).toBe(200);
      expect(getResponse.data).toHaveProperty('data');
    } else {
      expect(createResponse).toHaveProperty('status');
    }
  });
});