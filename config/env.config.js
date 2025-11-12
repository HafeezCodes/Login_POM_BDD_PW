// config/env.config.js
// This file loads environment variables from .env file

require('dotenv').config();

const envConfig = {

    baseURL: process.env.BASE_URL,
    
    validUser: {
        email: process.env.VALID_EMAIL,
        password: process.env.VALID_PASSWORD
    },
    
    invalidEmail: process.env.INVALID_EMAIL,
    invalidPassword: process.env.INVALID_PASSWORD,
    
    // Browser settings
    headless: process.env.HEADLESS === 'true' || false,
    slowMo: parseInt(process.env.SLOW_MO) || 100,
};

// Validate that required environment variables are set
const requiredEnvVars = [
    'BASE_URL',
    'VALID_EMAIL', 
    'VALID_PASSWORD',
    'INVALID_EMAIL',
    'INVALID_PASSWORD'
];

requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
        console.error(`Error: ${varName} is not set in .env file`);
        console.log('Tip: Copy .env.example to .env and fill in your credentials');
        process.exit(1);
    }
});

module.exports = envConfig;
