module.exports = {
  valid: {
    bvn: {
      standard: '22293381111',
      alternative: '22465966624',
      length: 11
    },
    contact: {
      phone: '08012345678',
      email: 'test@example.com',
      internationalPhone: '+2348081234561'
    },
    otp: {
      valid: '623553',
      expired: '999999',
      wrongFormat: 'abc123'
    },
    bankAccount: {
      standard: {
        accountNumber: '0425571111',
        bankCode: '058'
      },
      alternative: {
        accountNumber: '2150302690',
        bankCode: '057'
      }
    },
    karmaIdentity: {
      domain: '0zspgifzbo.ga',
      email: 'fraudster@example.com',
      phone: '+2347012345678',
      bvn: '22123456789'
    },
    nin: {
      standard: '70123456789',
      alternative: '80123456789',
      format: /^\d{11}$/
    }
  },
  
  invalid: {
    bvn: [
      { value: '123', description: 'too short', expectedCode: 400 },
      { value: '123456789012', description: 'too long', expectedCode: 400 },
      { value: 'abcdefghijk', description: 'non-numeric', expectedCode: 400 },
      { value: '', description: 'empty string', expectedCode: 400 },
      { value: null, description: 'null value', expectedCode: 400 },
      { value: '   ', description: 'whitespace only', expectedCode: 400 }
    ],
    contact: [
      { value: '123', description: 'invalid phone format' },
      { value: 'notaphone', description: 'non-numeric' },
      { value: '', description: 'empty string' },
      { value: '12345678901234567890', description: 'too long' }
    ],
    otp: [
      { value: '000000', description: 'all zeros' },
      { value: '12345', description: 'too short' },
      { value: '1234567', description: 'too long' },
      { value: 'abcdef', description: 'non-numeric' }
    ],
    bankAccount: [
      {
        data: { account_number: '0000000000', bank_code: '058' },
        description: 'invalid account number'
      },
      {
        data: { account_number: '0425571111', bank_code: '999' },
        description: 'invalid bank code'
      },
      {
        data: { account_number: '0425571111' },
        description: 'missing bank_code'
      },
      {
        data: { bank_code: '058' },
        description: 'missing account_number'
      },
      {
        data: {},
        description: 'empty payload'
      }
    ],
    karmaIdentity: [
      { value: 'nonexistent-identity-12345', description: 'non-existent' },
      { value: '', description: 'empty string' },
      { value: '   ', description: 'whitespace only' },
      { value: 'invalid!@#$%', description: 'special characters' }
    ],
    nin: [
      { value: '123', description: 'too short' },
      { value: '1234567890123', description: 'too long' },
      { value: 'abcdefghijk', description: 'non-numeric' },
      { value: '', description: 'empty string' },
      { value: null, description: 'null value' }
    ]
  },
  
  edge: {
    bvn: {
      boundaryMin: '10000000000',
      boundaryMax: '99999999999',
      allZeros: '00000000000',
      allNines: '99999999999'
    },
    specialCharacters: {
      bvn: '22!@#$%^&*()',
      email: 'test+special@example.com',
      phone: '+234-701-234-5678'
    }
  }
};