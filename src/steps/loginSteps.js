// src/steps/loginSteps.js

const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const envConfig = require('../../config/env.config');
const config = require('../../config/playwright.config');

// Optional: align with your per-test timeout ceiling
setDefaultTimeout(config.timeout ?? 90_000);

// GIVEN
Given('user navigates to the login page', async function () {
    await this.loginPage.navigateToLogin();
    await expect(this.loginPage.emailInput).toBeVisible({ timeout: 10_000 });
});


// WHEN
When('user enters {string} email address', async function (emailType) {
    let email;
    switch (emailType) {
        case 'valid':
            email = envConfig.validUser.email;
            break;
        case 'invalid':
            email = envConfig.invalidEmail;
            break;
        default:
            throw new Error(`Unknown email type: ${emailType}`);
    }
    await this.loginPage.enterEmail(email);
});

When('user enters {string} password', async function (passwordType) {
    let password;
    switch (passwordType) {
        case 'valid':
            password = envConfig.validUser.password;
            break;
        case 'invalid':
            password = envConfig.invalidPassword;
            break;
        default:
            throw new Error(`Unknown password type: ${passwordType}`);
    }
    await this.loginPage.enterPassword(password);
});

When('user clicks on Sign In button', async function () {
    await this.loginPage.clickSignIn();
});

// THEN
Then('user should see {string}', async function (expectedResult) {
    if (expectedResult === 'dashboard') {
        const url = await this.dashboardPage.waitUntilOnDashboard({ timeoutMs: 15_000 });
        await expect(url).toBe(this.dashboardPage.dashboardURL);

        const headingText = await this.dashboardPage.getHeadingText({ timeoutMs: 10_000 });
        await expect(headingText).toMatch(/Account Overview/i);
        return;
    }

    if (expectedResult === 'error') {
        const errorText = await this.loginPage.getErrorMessageText({ timeoutMs: 10_000 });
        await expect(errorText).toContain('Incorrect e-mail address or password');
        return;
    }

    throw new Error(`Unknown expected result: ${expectedResult}`);
});

