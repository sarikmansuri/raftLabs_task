const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function (req, res, next) {
    const token = req.header('Authorization').split(" ")[1];
    if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });
console.log("token ------->",token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};