# Adjutor API Automation

> Automated API tests for Lendsqr Adjutor's Nigerian country-specific endpoints (Karma, BVN, NIN, Credit Bureaus, Direct Debit, Decisioning).

## Table of Contents
- [Tech Stack](#tech-stack)
- [Test Coverage](#test-coverage)
- [Setup](#setup)
- [Running Tests Locally](#running-tests-locally)
- [CI/CD with GitHub Actions](#cicd-with-github-actions)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Tech Stack
- Node.js v20+
- Jest (testing framework)
- Axios (HTTP client)
- GitHub Actions (CI)

## Test Coverage
| Module | Endpoints | Test Cases |
|--------|-----------|-------------|
| Validation NG | Karma, BVN Consent, NIN Verification | 9 |
| Credit Bureaus NG | CRC, FirstCentral | 4 |
| Direct Debit NG | Banks, Mandate, Transactions | 9 |
| Decisioning NG | Models, Borrower Scoring | 4 |
| **Total** | **10+ endpoints** | **26** |

## Setup

### Prerequisites
- Node.js v20+
- npm v10+

### Installation

```bash
git clone https://github.com/bukky-eo/adjutor-api-automation.git
cd adjutor-api-automation
npm install