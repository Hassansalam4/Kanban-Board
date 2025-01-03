import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY || "", function (err, decoded) {
            if (err)
                return res.sendStatus(403);
            req.user = decoded; // Add user data to the request object
            return next();
        });
    }
    return res.sendStatus(401);
};
