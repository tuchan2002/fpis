const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    const requestHeader = req.header('Authorization');
    const token = requestHeader && requestHeader.split(' ')[1];

    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: 'Unauthenticated.' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decodedToken.userId;
        req.userRole = decodedToken.userRole;
        next();
    } catch (err) {
        return res.status(403).json({ success: false, message: 'Invalid token.' });
    }
};

module.exports = isAuth;
