module.exports = {
    default: {
        // Step definitions and support files
        require: ['src/steps/**/*.js', 'src/support/**/*.js'],

        // Feature files
        paths: ['features/**/*.feature'],

        // Output formats
        format: [
            'summary',
            'html:reports/cucumber-report.html',
            'json:reports/cucumber-report.json'
        ],

        // Snippet style for undefined steps
        formatOptions: {
            snippetInterface: 'async-await'
        }
    }
};
