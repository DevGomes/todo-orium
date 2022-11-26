const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = async (req, res, next) => {
	const { authorization } = req.headers;
	if (authorization) {
		try {
			const [authType, token] = authorization.trim().split(' ');
			if (authType !== 'Bearer') throw new Error('Bearer token not found');

			let publicKey = fs.readFileSync('./public.key');
			jwt.verify(token, publicKey, { algorithms: ['RS256'] }, validateToken);
		} catch(error) {
			res.status(401).send({message: 'Entered token is invalid'});
			return;
		}
	} else {
		res.status(401).send({message: `Access denied, you don't have permission to access this resource.`});
		return;
	}

	function validateToken(err, decoded) {
		if (err) {
			return res.status(500).send({ auth: false, message: 'Invalid token' }); 
		}
	
		req.authenticatedUser = decoded;
		next();
	}
};

