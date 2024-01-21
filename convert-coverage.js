const fs = require('fs')

// Read the content of the coverage-final.json file
const coverageData = require('./coverage/coverage-final.json')

// Extract relevant information and create a summary object
const summary = coverageData
// Write the summary to coverage-summary.json
fs.writeFileSync('./coverage/coverage-summary.json', JSON.stringify(summary, null, 2))

console.log('Coverage summary file created successfully.')
