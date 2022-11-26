const app = require('../bin/express');
const configVariables = require('../bin/configuration/variables');
const variablePort = configVariables.API.port;

app.listen(variablePort, () => {
    console.log(`API has been initialized with successful at port ${variablePort}`);
});

module.exports = app;
