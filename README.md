# Adjutor API Automation - Capital Credit Limited

## Overview
Automated test scripts for Lendsqr Adjutor API's Nigerian Country Specific endpoints.

## Test Coverage

| Module | Endpoints | Test Cases |
|--------|-----------|------------|
| Validation NG | Karma, BVN Consent, NIN Verification | 9 |
| Credit Bureaus NG | CRC, FirstCentral | 4 |
| Direct Debit NG | Banks, Mandate, Transactions | 9 |
| Decisioning NG | Models, Borrower Scoring | 4 |
| **Total** | **10+ endpoints** | **26** |

## Setup Instructions

### Prerequisites
- Node.js v16+
- npm v8+

### Installation

```bash
# Clone repository
git clone https://github.com/bukky_eo/adjutor-automation.git
cd adjutor-automation

# Install dependencies
npm install

# Create .env file
cp .env.example .env