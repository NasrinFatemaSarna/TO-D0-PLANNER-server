// var jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     let token = req.headers["token"];
    
    
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             res.status(401).json({ status: 'fail', message: 'invalid token' });
//         } 
//         else {
//             let email = decoded.data;
//             req.headers.email = email;
//           next(); 
//         }
//     });
// };
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers["token"];
    
    if (!token) {
        return res.status(401).json({ status: 'fail', message: 'Token not provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error(err);
            return res.status(401).json({ status: 'fail', message: 'Invalid token' });
        } else {
            const email = decoded.data;
            req.headers.email = email;
            next(); 
        }
    });
};
