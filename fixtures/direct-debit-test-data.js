module.exports = {
  valid: {
    bank: {
      id: 16,
      name: 'Guaranty Trust Bank',
      bankCode: '058',
      institutionCode: '000013',
      commercialBankCode: '058',
      microfinanceBankCode: '50211'
    },
    account: {
      accountNumber: '2150302690',
      accountName: 'vee Test',
      bvn: '220000000099',
      sessionId: '999999230427160615129743771734'
    },
    mandate: {
      standard: {
        account_number: "2017991793",
        phone_number: "08072444975",
        debit_type: "partial",
        frequency: "daily",
        bank_code: "50211",
        email: "jesutomy.oni@gmail.com",
        number_of_payments: 5,
        payment_start_date: "2024-11-01",
        start_date: "2024-11-01",
        end_date: "2024-12-30",
        narration: "Rand",
        address: "Ikate",
        invite: true,
        amount: 1500,
        minimum_amount: 1000,
        type: "emandate"
      },
      partial: {
        account_number: '2017991793',
        phone_number: '08072444975',
        debit_type: 'partial',
        frequency: 'daily',
        bank_code: '50211',
        email: 'jesutomy.oni@gmail.com',
        number_of_payments: 5,
        payment_start_date: '2024-11-01',
        start_date: '2024-11-01',
        end_date: '2024-12-30',
        narration: 'Rand',
        address: 'Ikate',
        invite: true,
        amount: 1500,
        minimum_amount: 1000,
        type: 'emandate'
      },
      manual: {
        account_number: '2150000090',
        phone_number: '08130050033',
        debit_type: 'all',
        frequency: 'daily',
        bank_code: '057',
        email: 'email@example.com',
        number_of_payments: 10,
        payment_start_date: '2024-12-01',
        start_date: '2024-12-01',
        end_date: '2025-01-30',
        narration: 'Manual Mandate Test',
        address: 'Lagos',
        invite: false,
        amount: 1000,
        type: 'manual'
      }
    },
    transaction: {
      reference: 'DD-WCo3KTTUn1dZgAV',
      amount: '250.00',
      status: 'failed',
      narration: 'Direct debit for mandate schedule 699'
    }
  },
  
  invalid: {
    bankCodes: [
      { code: '000', description: 'non-existent bank code', expectedCode: 400 },
      { code: '99999', description: 'invalid format', expectedCode: 400 },
      { code: '', description: 'empty code', expectedCode: 400 },
      { code: 'abc', description: 'non-numeric', expectedCode: 400 }
    ],
    accountNumbers: [
      { number: '12345', description: 'too short', expectedCode: 400 },
      { number: '123456789012345', description: 'too long', expectedCode: 400 },
      { number: 'abcdefghij', description: 'non-numeric', expectedCode: 400 },
      { number: '', description: 'empty', expectedCode: 400 },
      { number: '0000000000', description: 'all zeros', expectedCode: 404 }
    ],
    mandatePayloads: [
      {
        data: { account_number: '0123456789' },
        description: 'missing required fields',
        expectedCode: 422
      },
      {
        data: { account_number: '0123456789', bank_code: '057' },
        description: 'missing phone_number and email',
        expectedCode: 422
      },
      {
        data: { account_number: '0123456789', bank_code: '057', phone_number: '08123456789' },
        description: 'missing email',
        expectedCode: 422
      },
      {
        data: {},
        description: 'empty payload',
        expectedCode: 400
      }
    ],
    paginationParams: [
      { limit: -1, page: 1, description: 'negative limit' },
      { limit: 0, page: 1, description: 'zero limit' },
      { limit: 1000, page: 1, description: 'excessive limit' },
      { limit: 10, page: -1, description: 'negative page' },
      { limit: 10, page: 0, description: 'zero page' },
      { limit: 'abc', page: 1, description: 'non-numeric limit' }
    ],
    dates: [
      { date: '2020-01-01', description: 'past date' },
      { date: '2025-01-01', description: 'future date' },
      { date: 'invalid-date', description: 'invalid format' },
      { date: '', description: 'empty date' }
    ]
  },
  
  edge: {
    amountBoundaries: {
      minAmount: 50,
      maxAmount: 999999999,
      zeroAmount: 0,
      negativeAmount: -100
    },
    stringLengths: {
      maxNarration: 255,
      maxAddress: 500,
      emptyString: '',
      whitespaceOnly: '   '
    },
    specialCharacters: {
      narration: 'Test @#$%^&*()_+{}|:"<>?',
      address: '123 Main St., Apt #4B, Lagos @ Nigeria'
    }
  },
  
  bankData: {
    commercialBanks: [
      { code: '044', name: 'Access Bank', type: 'commercial' },
      { code: '011', name: 'First Bank of Nigeria', type: 'commercial' },
      { code: '058', name: 'Guaranty Trust Bank', type: 'commercial' },
      { code: '057', name: 'Zenith Bank', type: 'commercial' },
      { code: '033', name: 'United Bank For Africa', type: 'commercial' }
    ],
    microfinanceBanks: [
      { code: '50211', name: 'Kuda Bank', type: 'microfinance' },
      { code: '51204', name: 'Sparkle', type: 'microfinance' }
    ]
  },
  
  paginationScenarios: [
    { limit: 5, page: 1, expectedRecords: '<=5' },
    { limit: 20, page: 1, expectedRecords: '<=20' },
    { limit: 100, page: 1, expectedRecords: '<=100' },
    { limit: 10, page: 2, expectedRecords: 'varies' },
    { limit: 10, page: 999, expectedRecords: 0 }
  ]
};