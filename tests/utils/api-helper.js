class APIHelper {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  validateStatusCode(actual, expected, context = '') {
    const expectedArray = Array.isArray(expected) ? expected : [expected];
    const isValid = expectedArray.includes(actual);
    
    if (!isValid) {
      throw new Error(
        `${context ? context + ': ' : ''}Expected status ${expectedArray.join(' or ')}, got ${actual}`
      );
    }
    return true;
  }

validateBVNConsentResponse(response, expectedStatus) {
  if (response.status === 200) {
    this.validateStatusCode(response.status, [200]);
    this.validateResponseStructure(response, ['status', 'message']);
    
    const responseData = response.data;
    
    if (responseData.status !== expectedStatus) {
      throw new Error(`Expected status "${expectedStatus}", got "${responseData.status}"`);
    }
    
    if (expectedStatus === 'otp') {
      if (!responseData.data || typeof responseData.data !== 'string') {
        throw new Error('OTP response should have masked contact in data field');
      }
    }
    
    if (responseData.meta) {
      this.validateMetaData(responseData.meta);
    }
    
    return responseData;
  }
  
  if (response.status === 500) {
    this.validateStatusCode(response.status, [500]);
    this.validateResponseStructure(response, ['status', 'message']);
    
    expect(response.data.status).toBe('error');
    expect(typeof response.data.message).toBe('string');
    
    return response.data;
  }
  
  throw new Error(`Unexpected status code: ${response.status}`);
}

  validateResponseStructure(response, requiredFields = []) {
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is null or not an object');
    }

    if (!response.data) {
      throw new Error('Invalid response: missing data property');
    }

    for (const field of requiredFields) {
      if (!response.data.hasOwnProperty(field)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    return true;
  }

  validatePaginationResponse(response, expectedPageSize = null) {
    this.validateResponseStructure(response, ['data']);
    
    const data = response.data;
    
    if (data.data && Array.isArray(data.data)) {
      if (expectedPageSize) {
        expect(data.data.length).toBeLessThanOrEqual(expectedPageSize);
      }
    }
    
    if (data.meta) {
      const requiredMetaFields = ['records', 'page', 'pages', 'page_size'];
      requiredMetaFields.forEach(field => {
        if (!data.meta.hasOwnProperty(field)) {
          console.warn(`Warning: Meta missing optional field: ${field}`);
        }
      });
    }
    
    return true;
  }

  validateBankData(bank) {
    const requiredFields = ['id', 'name', 'bank_code', 'institution_code'];
    
    for (const field of requiredFields) {
      if (!bank.hasOwnProperty(field)) {
        throw new Error(`Bank data missing required field: ${field}`);
      }
    }
    
    expect(typeof bank.id).toBe('number');
    expect(typeof bank.name).toBe('string');
    expect(typeof bank.bank_code).toBe('string');
    expect(bank.bank_code).toMatch(/^\d{3,5}$/);
    
    if (bank.url) {
      expect(bank.url).toMatch(/^https?:\/\//);
    }
    
    return true;
  }

  validateMandateData(mandate) {
    const requiredFields = [
      'id', 'reference_number', 'account_number', 'account_name',
      'frequency', 'status', 'type', 'created_on'
    ];
    
    for (const field of requiredFields) {
      if (!mandate.hasOwnProperty(field)) {
        throw new Error(`Mandate data missing required field: ${field}`);
      }
    }
    
    const validStatuses = ['initiated', 'active', 'suspended', 'terminated', 'completed'];
    expect(validStatuses).toContain(mandate.status);
    
    const validTypes = ['emandate', 'manual'];
    expect(validTypes).toContain(mandate.type);
    
    return true;
  }

  validateTransactionData(transaction) {
    const requiredFields = [
      'id', 'amount', 'mandate_id', 'reference', 'status', 'created_on'
    ];
    
    for (const field of requiredFields) {
      if (!transaction.hasOwnProperty(field)) {
        throw new Error(`Transaction data missing required field: ${field}`);
      }
    }
    
    expect(transaction.amount).toMatch(/^\d+(\.\d{2})?$/);
    
    const validStatuses = ['successful', 'pending', 'failed', 'reversed'];
    expect(validStatuses).toContain(transaction.status);
    
    return true;
  }

  logResponseDetails(response, testName) {
    console.log(`[${testName}] Status: ${response.status}`);
    
    if (response.data) {
      console.log(`[${testName}] Response Status: ${response.data.status || 'N/A'}`);
      console.log(`[${testName}] Message: ${response.data.message || 'N/A'}`);
      
      if (response.data.meta) {
        console.log(`[${testName}] Cost: ₦${response.data.meta.cost || 0}, Balance: ₦${response.data.meta.balance || 0}`);
      }
      
      if (response.data.data && response.data.data.data) {
        console.log(`[${testName}] Record Count: ${response.data.data.data.length || 0}`);
      }
    }
  }

  extractErrorMessage(error) {
    if (error.response && error.response.data) {
      return error.response.data.message || 
             error.response.data.error || 
             JSON.stringify(error.response.data);
    }
    return error.message || 'Unknown error occurred';
  }

  buildQueryParams(params) {
    return Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
    );
  }
}

module.exports = APIHelper;