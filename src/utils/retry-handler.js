// For flaky tests
class RetryHandler {
  constructor(config = {}) {
    this.maxRetries = config.maxRetries || 3;
    this.baseDelay = config.baseDelay || 1000;
    this.maxDelay = config.maxDelay || 10000;
    this.backoffFactor = config.backoffFactor || 2;
  }

  async executeWithRetry(fn, context = '', shouldRetry = this.defaultShouldRetry) {
    let lastError;
    
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const result = await fn();
        
        if (result && result.status === 429) {
          throw new Error('Rate limited');
        }
        
        return result;
      } catch (error) {
        lastError = error;
        
        if (!shouldRetry(error, attempt)) {
          throw error;
        }
        
        const delay = this.calculateDelay(attempt);
        console.warn(`[Retry] ${context} - Attempt ${attempt} failed. Retrying in ${delay}ms...`);
        console.warn(`[Retry] Error: ${error.message}`);
        
        await this.sleep(delay);
      }
    }
    
    throw new Error(`[Retry] ${context} - Failed after ${this.maxRetries} attempts. Last error: ${lastError.message}`);
  }

  defaultShouldRetry(error, attempt) {
    const retryableErrors = ['ECONNRESET', 'ETIMEDOUT', 'ECONNREFUSED', 'Rate limited', 'socket hang up'];
    const isRetryable = retryableErrors.some(errType => error.message.includes(errType));
    const isServerError = error.response && error.response.status >= 500;
    const isClientError = error.response && error.response.status >= 400 && error.response.status < 500 && error.response.status !== 429;
    
    return (isRetryable || isServerError) && !isClientError;
  }

  calculateDelay(attempt) {
    const exponentialDelay = this.baseDelay * Math.pow(this.backoffFactor, attempt - 1);
    const delay = Math.min(exponentialDelay, this.maxDelay);
    const jitter = delay * 0.1 * Math.random();
    return Math.floor(delay + jitter);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  createRateLimiter(requestsPerSecond = 5) {
    const minInterval = 1000 / requestsPerSecond;
    let lastCallTime = 0;
    
    return async (fn) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCallTime;
      
      if (timeSinceLastCall < minInterval) {
        await this.sleep(minInterval - timeSinceLastCall);
      }
      
      lastCallTime = Date.now();
      return await fn();
    };
  }
}

module.exports = RetryHandler;