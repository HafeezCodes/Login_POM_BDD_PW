// src/pages/LoginPage.js

const envConfig = require('../../config/env.config');
const config = require('../../config/playwright.config');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginURL = `${envConfig.baseURL}/login`;
        this.emailInput = page.locator('#signInName');
        this.passwordInput = page.locator('#password');
        this.signInButton = page.locator('#next');
        this.errorMessage = page.getByRole('alert');
    }

    async navigateToLogin() {
        await this.page.goto(this.loginURL, {
            waitUntil: 'domcontentloaded',
        });
    }

    async enterEmail(email) {
        await this.emailInput.fill(email);
    }

    async enterPassword(password) {
        await this.passwordInput.fill(password);
    }

    async clickSignIn() {
        await this.signInButton.click();
    }

    async login(email, password) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickSignIn();
    }

    async getErrorMessageText({ timeoutMs = 10000 } = {}) {
        await this.errorMessage.waitFor({ state: 'visible', timeout: timeoutMs });
        const text = await this.errorMessage.textContent();
        return text?.trim() ?? '';
    }

    async currentUrl() {
        return this.page.url();
    }
}

module.exports = LoginPage;
