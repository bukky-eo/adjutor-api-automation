const axios = require('axios');
require('dotenv').config();

if (!process.env.API_KEY) {
  console.error('ERROR: API_KEY is not set in .env file');
  process.exit(1);
}

if (!process.env.BASE_URL) {
  console.warn('WARNING: BASE_URL not set, using default');
}

class AdjutorAPIClient {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.BASE_URL || 'https://adjutor.lendsqr.com/v2/',
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 30000
    });
  }

  // Validation
async checkKarma(identifier) {
  try {
    const response = await this.client.get(`/karma/${identifier}`);
    return response;
  } catch (error) {
    return error.response || error;
  }
}

async completeBVNConsent(bvn, otp) {
  try {
    const response = await this.client.put(`/verification/bvn/${bvn}`, { otp });
    return response;
  } catch (error) {
    return error.response || error;
  }
}

async verifyNIN(nin) {
  try {
    const response = await this.client.get(`/verification/nin/${nin}`);
    return response;
  } catch (error) {
    return error.response || error;
  }
}

  // Credit bureau  
  async getCRCReport(bvn) {
    try {
      const response = await this.client.get(`/creditbureaus/crc/${bvn}`);
      return response;
    } catch (error) {
      return error.response || error;
    }
  }
 
  async getFirstCentralReport(bvn) {
    try {
      const response = await this.client.get(`/creditbureaus/firstcentral/${bvn}`);
      return response;
    } catch (error) {
      return error.response || error;
    }
  }

 // Debit Direct


async getAllBanks(limit = 100, page = 1, sortDir = 'ASC') {
  try {
    const response = await this.client.get('/direct-debit/banks', {
      params: { limit, page, sort_dir: sortDir }
    });
    return response;
  } catch (error) {
    return error.response || error;
  }
}

async createMandate(mandateData) {
  try {
    const response = await this.client.post('/direct-debit/mandate', mandateData);
    return response;
  } catch (error) {
    return error.response || error;
  }
}

async getMandate(mandateId) {
  try {
    const response = await this.client.get(`/direct-debit/mandate/${mandateId}`);
    return response;
  } catch (error) {
    return error.response || error;
  }
}

async initiateDebit(transactionData) {
  try {
    const response = await this.client.post('/direct-debit/transaction/debit', transactionData);
    return response;
  } catch (error) {
    return error.response || error;
  }
}

async getTransactions(params = {}) {
  try {
    const response = await this.client.get('/direct-debit/transactions', { params });
    return response;
  } catch (error) {
    return error.response || error;
  }
}


  // Decision

  async getDecisionModels() {
    try {
      const response = await this.client.get('/decisioning/models');
      return response;
    } catch (error) {
      return error.response || error;
    }
  }

  async getDecisionModelDetails(modelId) {
    try {
      const response = await this.client.get(`/decisioning/models/${modelId}/settings`);
      return response;
    } catch (error) {
      return error.response || error;
    }
  }

  async getBorrowerScore(modelId, borrowerData) {
    try {
      const response = await this.client.post(`/decisioning/models/${modelId}`, borrowerData);
      return response;
    } catch (error) {
      return error.response || error;
    }
  }
}

module.exports = AdjutorAPIClient;