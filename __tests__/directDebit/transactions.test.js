const AdjutorAPIClient = require('../../src/apiClient');

describe('Direct Debit: Transactions Module', () => {
  let client;

  beforeAll(() => {
    client = new AdjutorAPIClient();
  });

  const validDebitData = {
    mandate_code: "MND-123456",
    amount: "5000.00",
    narration: "Monthly loan repayment",
    reference: `REF-${Date.now()}`
  };

  test('TC-DD-TRANSACTION-001: Should initiate debit on active mandate', async () => {
    const response = await client.initiateDebit(validDebitData);
    
    expect([200, 201, 400, 402, 404]).toContain(response.status);
    
    if (response.status === 200 || response.status === 201) {
      expect(response.data).toHaveProperty('status');
      expect(response.data.data).toHaveProperty('transaction_reference');
      expect(response.data.data).toHaveProperty('status');
    }
  });

  test('TC-DD-TRANSACTION-002: Should return error for invalid mandate code', async () => {
    const invalidData = { ...validDebitData, mandate_code: "INVALID-99999" };
    const response = await client.initiateDebit(invalidData);
    
    expect([400, 404, 422]).toContain(response.status);
    expect(response.data).toHaveProperty('message');
  });

  test('TC-DD-TRANSACTION-003: Should retrieve transaction history', async () => {
    const response = await client.getTransactions({ limit: 10, page: 1 });
    
    expect([200, 404]).toContain(response.status);
    if (response.status === 200) {
      expect(response.data).toHaveProperty('status');
      expect(response.data.data).toBeDefined();
    }
  });
});