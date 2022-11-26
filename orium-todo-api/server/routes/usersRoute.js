const express = require('express');
const router = express.Router();
const usersService = require('../services/usersService');


router.post('/users', async (req, res) => {
    const user = req.body;
    await usersService.saveUser(user);
    res.end();
});

router.post('/users/authenticate', async (req, res) => {
    const user = req.body;
    await usersService.authenticate(user, res);
});

module.exports = router;