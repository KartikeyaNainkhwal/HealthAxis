import jwt from 'jsonwebtoken'

// User authentication middleware
const authUser = async (req, res, next) => {
    const { token } = req.headers
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized. Please log in.' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!req.body) req.body = {}
        req.body.userId = decoded.id
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' })
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token. Please log in again.' })
        }
        res.status(401).json({ success: false, message: error.message })
    }
}

export default authUser
