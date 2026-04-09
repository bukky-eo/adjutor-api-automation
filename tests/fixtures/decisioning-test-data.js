module.exports = {
  valid: {
    modelIds: [
      { id: 1, name: 'Credit Scoring Model' },
      { id: 2, name: 'Fraud Detection Model' },
      { id: 3, name: 'Risk Assessment Model' }
    ]
  },
  
  invalid: {
    modelIds: [
      { id: 0, description: 'zero id', expectedCode: 404 },
      { id: -1, description: 'negative id', expectedCode: 404 },
      { id: 999999, description: 'non-existent id', expectedCode: 404 },
      { id: 'abc', description: 'non-numeric id', expectedCode: 400 },
      { id: '', description: 'empty id', expectedCode: 404 }
    ]
  },
  
  edge: {
    modelIds: [
      { id: Number.MAX_SAFE_INTEGER, description: 'max integer' },
      { id: 1.5, description: 'decimal id' }
    ]
  },
  
  expectations: {
    getModels: {
      expectedStatus: 200,
      responseType: 'array or object'
    },
    getModelDetails: {
      expectedStatus: 200,
      responseType: 'object'
    }
  }
};