const usersData = require('../datas/usersData');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const fs = require('fs');


exports.saveUser = async (user) => {
    const {password} = user 
    user.password = md5(password);
    return usersData.saveUser(user);
}

exports.getUserById = (userId) => {
    return usersData.getUsersById(userId);
}

exports.authenticate = async (user, res) => {
    const {email, password} = user;
    let _hasPassword = md5(password);
    const hasUser = await usersData.getAuthenticateUser(email, _hasPassword);

    function generateToken() {
        const privateKey = fs.readFileSync('./private.key', 'utf-8');
        const getAccessToken = async (hasUser) => {
            if (hasUser) {
                return await singToken(hasUser, '60min')
            }
            return;
        }

        async function singToken(user, expiresIn) {
            if (!user || !expiresIn) {
                return;
            }
            return await jwt.sign({ user: user.pop() }, privateKey, {
                expiresIn,
                algorithm: 'RS256'
            });
        }

        return  {
            getAccessToken,
        }
    };

    if (hasUser.length > 0) {
        res.status(200).send({
            user: hasUser[0],
            token: await generateToken().getAccessToken(hasUser)
        })
    } else {
        return res.status(404).send({ message: 'User not found '});
    }
    
};

exports.deleteUserById = async (userId) => {
    return await usersData.deleteUserById(userId);
}

