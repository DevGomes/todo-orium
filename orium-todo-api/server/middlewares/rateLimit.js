const configVariables = require('../../bin/configuration/variables');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

const limiter = rateLimit({
    windowMs: configVariables.Security.rateLimit.window,
    max: configVariables.Security.rateLimit.maxRequest,
    message: configVariables.Security.rateLimit.message
});

const slower = slowDown({
    windowMs: configVariables.Security.slowDown.window,
    delayAfter: configVariables.Security.slowDown.delayAfter,
    delayMs: configVariables.Security.slowDown.delayMs
});

module.exports = {
    limiter,
    slower
};