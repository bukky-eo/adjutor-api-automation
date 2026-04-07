// Test data fixtures for all the modules i selected
module.exports = {
  validation: {
    validBVN: '22123456789',
    validOTP: '623553',
    invalidOTP: '000000',
    validNIN: '70123456789',
    invalidNIN: '12345',
    karmaPhone: '08012345678',
    karmaEmail: 'customer@example.com'
  },
  creditBureaus: {
    validBVN: '22293381111',
    invalidBVN: '00000000000'
  },
  directDebit: {
    mandateData: {
      account_number: "1234567890",
      bank_code: "058",
      amount: "5000.00",
      start_date: "2026-05-01",
      end_date: "2026-12-31",
      narration: "Loan Repayment - Capital Cash",
      customer_name: "John Doe",
      customer_email: "john.doe@example.com",
      customer_phone: "08012345678"
    },
    debitData: {
      mandate_code: "MND-123456",
      amount: "5000.00",
      narration: "Monthly loan repayment"
    }
  },
  decisioning: {
    modelId: 2355,
    borrowerData: {
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
    }
  }
};