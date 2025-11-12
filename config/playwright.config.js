// playwright.config.js

module.exports = {
    timeout: 90_000,
    use: {
        browserName: 'chromium',
        headless: false,
        slowMo: 250,
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        locale: 'en-US',
        timezoneId: 'America/New_York',
    },
    retries: 0,
    reporter: [
        ['list'],
        ['html', { open: 'on-failure' }],
    ],
};
