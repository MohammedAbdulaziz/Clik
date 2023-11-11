const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    // Get the token from the request headers
    const token = req.headers.authorization;
    // Check if token is present
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user object to the request object
        req.user = decoded;

        // Call the next middleware
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = authMiddleware;
