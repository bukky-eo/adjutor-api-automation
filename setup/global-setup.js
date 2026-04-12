require('dotenv').config();

beforeAll(() => {
  console.log('Starting Adjutor API Test Suite');
  console.log(`Test Run: ${new Date().toISOString()}`);
  console.log(`API Key Configured: ${!!process.env.API_KEY}`);
  console.log(`Base URL: ${process.env.BASE_URL}\n`);
});

afterAll(() => {
  console.log('Test Suite Completed');
});

jest.setTimeout(60000);

if (process.env.SUPPRESS_LOGS === 'true') {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  };
}