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
    // Get the token from the Authorization header
    const authHeader = req.headers["authorization"];
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ status: 'fail', message: 'Token not provided or in incorrect format' });
    }

    // Extract the token part from the "Bearer <token>"
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error(err);
            return res.status(401).json({ status: 'fail', message: 'Invalid or expired token' });
        } else {
            // Attach the decoded email to the request object for further use
            req.headers.email = decoded.data; // Assuming the token has the user's email stored in 'data'
            next(); 
        }
    });
};
