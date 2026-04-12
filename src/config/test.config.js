require('dotenv').config();

module.exports = {
  api: {
    baseURL: process.env.BASE_URL || 'https://adjutor.lendsqr.com/v2/',
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
    apiKey: process.env.API_KEY
  },
  
  test: {
    timeout: 60000,
    parallel: true,
    verbose: true,
    bail: false,
    testEnvironment: process.env.NODE_ENV || 'development'
  },
  
  validation: {
    statusCodes: {
      success: [200, 201, 202],
      badRequest: 500,
      unauthorized: 401,
      notFound: 404,
      serverError: [500, 502, 503]
    },
    responseStatus: {
      success: 'success',
      otpRequired: 'otp',
      pending: 'pending',
      error: 'error'
    }
  },
  
  directDebit: {
    statusCodes: {
      success: 200,
      created: 201,
      badRequest: 500,
      notFound: 404,
      conflict: 409
    },
    mandateStatuses: {
      initiated: 'initiated',
      active: 'active',
      suspended: 'suspended',
      terminated: 'terminated',
      completed: 'completed'
    },
    transactionStatuses: {
      successful: 'successful',
      pending: 'pending',
      failed: 'failed',
      reversed: 'reversed'
    },
    frequencies: {
      daily: 'daily',
      weekly: 'weekly',
      monthly: 'monthly',
      quarterly: 'quarterly',
      annually: 'annually'
    },
    debitTypes: {
      all: 'all',
      partial: 'partial'
    },
    mandateTypes: {
      emandate: 'emandate',
      manual: 'manual'
    },
    defaultPagination: {
      limit: 10,
      page: 1,
      maxLimit: 100
    }
  },
  
  decisioning: {
    statusCodes: {
      success: [200, 201],
      notFound: 404,
      badRequest: [400, 422]
    }
  },
  
  rateLimit: {
    enabled: true,
    requestsPerSecond: 5,
    delayBetweenRequests: 200,
    burstLimit: 10
  },
  
  reporting: {
    generateHtmlReport: true,
    generateJsonReport: true,
    reportDirectory: './test-reports',
    screenshotOnFailure: false
  }
};