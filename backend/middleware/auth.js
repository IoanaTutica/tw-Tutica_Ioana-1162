const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        jwt.verify(req.token, 'cheie_secreta_proiect', (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Token invalid' });
            }
            req.userId = decoded.id;
            next();
        });
    } else {
        res.status(401).json({ message: 'Lipsa token autorizare' });
    }
};

module.exports = verifyToken;