const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {

    const token = req.header("x-auth-token");

    if (!token) {
        res.status(403).json({
            error: "Please login first to access this endpoint!"
        })
    }

    jwt.verify(token, "SECRET SALT", (err, decoded) => {
        if (err) {
            res.status(401).json({
                error: "Unauthorized"
            })
        }
        req.email = decoded.email
    });
    next();
}

exports.verifyAdmin = (req, res, next) => {

    if (req.role !== "ADMIN") {
        return res.status(401).json("You are not authorised to access this endpoint!")
    }

    next();
}

exports.verifyUser = (req, res, next) => {

    if (req.role !== "USER") {
        return res.status(401).json("You are not authorised to access this endpoint!")
    }

    next();
}