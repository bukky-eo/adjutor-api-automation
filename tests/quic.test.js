const AdjutorAPIClient = require('../apiClient');
require('dotenv').config();

async function quickTest() {
  console.log('=== Quick API Test ===\n');
  
  const client = new AdjutorAPIClient();
  
  // Test Initialize BVN Consent
  console.log('Testing Initialize BVN Consent (POST)...');
  const bvn = '22293811111';
  const contact = '08012345678';
  
  const response = await client.initializeBVNConsent(bvn, contact);
  
  console.log('Status:', response.status);
  console.log('Response:', JSON.stringify(response.data, null, 2));
  
  if (response.status === 200) {
    console.log('\n✅ Success! API is working correctly');
  } else {
    console.log('\n❌ Failed. Check your API key and BVN');
  }
}

quickTest();