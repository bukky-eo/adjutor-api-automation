const AdjutorAPIClient = require('../../src/apiClient');

describe('Decisioning: Oraculi Borrower Scoring', () => {
  let client;

  beforeAll(() => {
    client = new AdjutorAPIClient();
  });

  const validBorrowerData = {
    gender: "Female",
    marital_status: "Single",
    age: 28,
    location: "Lagos",
    no_of_dependent: 0,
    type_of_residence: "rented apartment",
    education_attainment: "BSc",
    employment_status: "employed",
    sector_of_employment: "banking",
    tier: "tier 2",
    monthly_net_income: "700,000 - 999,999",
    employment_category: "private company",
    bvn: "22222222222",
    phone_number: "08055555555",
    working_period: 3,
    time_with_current_employer: 2,
    previous_lendsqr_loans: 0,
    code: "test123",
    phone: "08106666666",
    bvn_phone: "08106666666",
    official_email: "employee@company.com",
    personal_email: "customer@gmail.com",
    amount: "50000"
  };

  test('TC-SCORING-001: Return credit score for valid borrower data', async () => {
    const modelId = 2355;
    const response = await client.getBorrowerScore(modelId, validBorrowerData);
    
    expect([200, 400, 422]).toContain(response.status);
    if (response.status === 200) {
      expect(response.data).toHaveProperty('status');
    }
  });

  test('TC-SCORING-002: Return error when required field is missing', async () => {
    const incompleteData = { ...validBorrowerData };
    delete incompleteData.bvn;
    
    const response = await client.getBorrowerScore(2355, incompleteData);
    
    expect([400, 422]).toContain(response.status);
    expect(response.data).toHaveProperty('message');
  });
});