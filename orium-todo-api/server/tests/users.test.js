const crypto = require('crypto');
const axios = require('axios/dist/node/axios.cjs');
const userService = require('../services/usersService');


test('Should create a new user and authenticate', async function() {
    const email = generateString(10);
    const password = generateString(4)
    const userSave = await userService.saveUser({email, password});

    const {data} = await axios({
        url: 'http://localhost:3001/api/users/authenticate',
        data: { email, password },
        method: 'post'
    });

    expect(data.user).toBeDefined();
    expect(data.user.id).toBe(userSave.id);
    expect(data.token).toBeDefined();

    await userService.deleteUserById(data.user.id);
});

const generateString = function(lengthString) {
    return crypto.randomBytes(lengthString).toString('hex');
};
