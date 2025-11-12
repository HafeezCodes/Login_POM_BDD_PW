// src/pages/DashboardPage.js

const envConfig = require('../../config/env.config');

class DashboardPage {
    constructor(page) {
        this.page = page;
        this.dashboardURL = `${envConfig.baseURL}/dashboard`;
        this.dashboardHeading = page.getByRole('heading', { name: /Account Overview/i });
    }

    async navigateToDashboard() {
        await this.page.goto(this.dashboardURL, { waitUntil: 'domcontentloaded' });
    }

    async getHeadingText({ timeoutMs = 10000 } = {}) {
        await this.dashboardHeading.waitFor({ state: 'visible', timeout: timeoutMs });
        const text = await this.dashboardHeading.textContent();
        return text?.trim() ?? '';
    }

    async waitUntilOnDashboard({ timeoutMs = 20000 } = {}) {
        await this.page.waitForURL(this.dashboardURL, { timeout: timeoutMs });
        return this.page.url();
    }

    async getState({ timeoutMs = 20000 } = {}) {
        let headingVisible = false;
        let headingText = '';
        try {
            await this.dashboardHeading.waitFor({ state: 'visible', timeout: timeoutMs });
            headingVisible = true;
            const text = await this.dashboardHeading.textContent();
            headingText = text?.trim() ?? '';
        } catch {
            headingVisible = false;
        }
        return {
            url: this.page.url(),
            headingVisible,
            headingText,
        };
    }

    async currentUrl() {
        return this.page.url();
    }
}

module.exports = DashboardPage;
