const fs = require('fs');
const path = require('path');

class TestReportGenerator {
  constructor() {
    this.resultsDir = path.join(process.cwd(), 'test-results');
    this.ensureDirectoryExists();
  }

  ensureDirectoryExists() {
    if (!fs.existsSync(this.resultsDir)) {
      fs.mkdirSync(this.resultsDir, { recursive: true });
    }
  }

  generateSummaryReport() {
    const summary = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      apiBaseUrl: process.env.BASE_URL,
      modules: {
        validation: { status: 'pending', tests: 0, passed: 0, failed: 0 },
        directDebit: { status: 'pending', tests: 0, passed: 0, failed: 0 },
        decisioning: { status: 'pending', tests: 0, passed: 0, failed: 0 },
        creditBureau: { status: 'pending', tests: 0, passed: 0, failed: 0 }
      },
      totalTests: 0,
      totalPassed: 0,
      totalFailed: 0,
      passRate: 0
    };

    // Try to read Jest results
    const jestResultsPath = path.join(this.resultsDir, 'jest-results.json');
    if (fs.existsSync(jestResultsPath)) {
      const results = JSON.parse(fs.readFileSync(jestResultsPath, 'utf8'));
      summary.totalTests = results.numTotalTests;
      summary.totalPassed = results.numPassedTests;
      summary.totalFailed = results.numFailedTests;
      summary.passRate = ((summary.totalPassed / summary.totalTests) * 100).toFixed(2);
    }

    // Generate HTML report
    this.generateHtmlReport(summary);
    this.generateMarkdownReport(summary);
    this.generateJsonReport(summary);
    
    console.log('Reports generated successfully!');
    console.log(`Pass Rate: ${summary.passRate}%`);
    console.log(`Reports saved to: ${this.resultsDir}`);
  }

  generateHtmlReport(summary) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adjutor API Test Report</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        .header h1 { font-size: 2.5em; margin-bottom: 10px; }
        .header .timestamp { opacity: 0.9; font-size: 0.9em; }
        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            padding: 40px;
            background: #f8f9fa;
        }
        .summary-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .summary-card h3 { color: #666; font-size: 0.9em; margin-bottom: 10px; }
        .summary-card .value { font-size: 2em; font-weight: bold; }
        .summary-card.pass .value { color: #28a745; }
        .summary-card.fail .value { color: #dc3545; }
        .summary-card.rate .value { color: #667eea; }
        .modules {
            padding: 40px;
        }
        .module {
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            margin-bottom: 20px;
            overflow: hidden;
        }
        .module-header {
            background: #f8f9fa;
            padding: 15px 20px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .module-header:hover { background: #e9ecef; }
        .module-name { font-weight: bold; font-size: 1.1em; }
        .module-status {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85em;
        }
        .status-pass { background: #d4edda; color: #155724; }
        .status-fail { background: #f8d7da; color: #721c24; }
        .module-content { padding: 20px; display: none; }
        .module-content.active { display: block; }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
        }
        @media (max-width: 768px) {
            .summary { grid-template-columns: 1fr; }
            .header h1 { font-size: 1.5em; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Adjutor API Test Report</h1>
            <p>Comprehensive Test Execution Report</p>
            <p class="timestamp">Generated: ${summary.timestamp}</p>
            <p class="timestamp">Environment: ${summary.environment}</p>
        </div>
        
        <div class="summary">
            <div class="summary-card">
                <h3>Total Tests</h3>
                <div class="value">${summary.totalTests}</div>
            </div>
            <div class="summary-card pass">
                <h3>Passed</h3>
                <div class="value">${summary.totalPassed}</div>
            </div>
            <div class="summary-card fail">
                <h3>Failed</h3>
                <div class="value">${summary.totalFailed}</div>
            </div>
            <div class="summary-card rate">
                <h3>Pass Rate</h3>
                <div class="value">${summary.passRate}%</div>
            </div>
        </div>
        
        <div class="modules">
            <h2 style="margin-bottom: 20px;">Test Modules</h2>
            ${Object.entries(summary.modules).map(([name, data]) => `
            <div class="module">
                <div class="module-header" onclick="toggleModule(this)">
                    <span class="module-name">${this.formatModuleName(name)}</span>
                    <span class="module-status ${data.status === 'pass' ? 'status-pass' : 'status-fail'}">
                        ${data.status.toUpperCase()}
                    </span>
                </div>
                <div class="module-content">
                    <p>Tests: ${data.tests} | Passed: ${data.passed} | Failed: ${data.failed}</p>
                </div>
            </div>
            `).join('')}
        </div>
        
        <div class="footer">
            <p>Generated by Adjutor API Automation Framework</p>
            <p>Powered by Jest | CI/CD: GitHub Actions</p>
        </div>
    </div>
    
    <script>
        function toggleModule(header) {
            const content = header.nextElementSibling;
            content.classList.toggle('active');
        }
    </script>
</body>
</html>
    `;

    fs.writeFileSync(path.join(this.resultsDir, 'report.html'), html);
  }

  generateMarkdownReport(summary) {
    const markdown = `# Adjutor API Test Report

## Summary
- **Date**: ${summary.timestamp}
- **Environment**: ${summary.environment}
- **API Base URL**: ${summary.apiBaseUrl}
- **Total Tests**: ${summary.totalTests}
- **Passed**: ${summary.totalPassed}
- **Failed**: ${summary.totalFailed}
- **Pass Rate**: ${summary.passRate}%

## Module Results
| Module | Status | Tests | Passed | Failed |
|--------|--------|-------|--------|--------|
${Object.entries(summary.modules).map(([name, data]) => `| ${this.formatModuleName(name)} | ${data.status} | ${data.tests} | ${data.passed} | ${data.failed} |`).join('\n')}

## Links
- [Detailed HTML Report](./report.html)
- [JUnit XML Report](./junit.xml)
- [Coverage Report](../coverage/lcov-report/index.html)

---
*Report generated automatically by CI/CD pipeline*
`;

    fs.writeFileSync(path.join(this.resultsDir, 'SUMMARY.md'), markdown);
  }

  generateJsonReport(summary) {
    fs.writeFileSync(
      path.join(this.resultsDir, 'summary.json'),
      JSON.stringify(summary, null, 2)
    );
  }

  formatModuleName(name) {
    return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }
}

// Generate report
const generator = new TestReportGenerator();
generator.generateSummaryReport();