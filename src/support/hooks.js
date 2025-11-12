// src/support/hooks.js

const { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const config = require('../../config/playwright.config');
const fs = require('fs');
const path = require('path');

setDefaultTimeout(config.timeout);

let browser;

BeforeAll(async function () {
    if (!fs.existsSync('reports')) fs.mkdirSync('reports');
    if (!fs.existsSync('screenshots')) fs.mkdirSync('screenshots');
    console.log('=================================');
    console.log('Starting Test Execution');
    console.log('=================================\n');
});

Before(async function (scenario) {
    console.log(`\nScenario: ${scenario.pickle.name}`);
    console.log('─'.repeat(50));

    browser = await chromium.launch({
        headless: config.use.headless,
        slowMo: config.use.slowMo,
    });

    this.context = await browser.newContext({
        viewport: config.use.viewport,
        ignoreHTTPSErrors: config.use.ignoreHTTPSErrors,
        locale: config.use.locale,
        timezoneId: config.use.timezoneId,
    });

    this.page = await this.context.newPage();

    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);

    console.log('Browser launched successfully');
});

After(async function (scenario) {
    console.log('─'.repeat(50));

    if (scenario.result.status === Status.FAILED) {
        console.log('Scenario FAILED');

        const baseName = `${scenario.pickle.name.replace(/\s+/g, '_')}_${Date.now()}`;
        const screenshotPath = path.join('screenshots', `${baseName}.png`);
        const htmlPath = path.join('screenshots', `${baseName}.html`);

        try {
            await this.page.screenshot({ path: screenshotPath, fullPage: true });
            console.log(`Screenshot saved: ${screenshotPath}`);
            const image = await fs.promises.readFile(screenshotPath);
            await this.attach(image, 'image/png');
        } catch (error) {
            console.log('Could not take screenshot:', error.message);
        }

        try {
            const html = await this.page.content();
            await fs.promises.writeFile(htmlPath, html, 'utf-8');
            console.log(`HTML snapshot saved: ${htmlPath}`);
        } catch (error) {
            console.log('Could not save HTML snapshot:', error.message);
        }
    } else {
        console.log('Scenario PASSED');
    }

    try {
        await this.page?.close();
        await this.context?.close();
    } catch (e) {
        console.log('Error closing context/page:', e.message);
    }

    if (browser) {
        await browser.close();
        console.log('Browser closed\n');
    }
});

AfterAll(async function () {
    console.log('=================================');
    console.log('Test Execution Completed');
    console.log('=================================');
});
