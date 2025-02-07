module.exports = {
    default: {
      require: ["./tests/step-definitions/*.js"], // Path to step definitions
      format: ["html:reports/cucumber-report.html"], // Generate a test report
      paths: ["./tests/features/*.feature"], // Ensure Cucumber finds your feature files
      parallel: 1, // Run tests sequentially
    },
  };
  