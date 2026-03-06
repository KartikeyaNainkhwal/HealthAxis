// centralized error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error(`❌ ERROR: ${err.message}`);

    // Handle specific known errors (e.g. Multer/Busboy issues)
    if (err.message.includes('multipart') || err.message.includes('busboy')) {
        return res.status(400).json({
            success: false,
            message: 'Invalid file format. Please upload a proper image file.'
        });
    }

    if (err.message.includes('Malformed')) {
        return res.status(400).json({
            success: false,
            message: 'Malformed form-data request. Ensure image=File and others=Text.'
        });
    }

    // Handle Mongoose Validator errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: Object.values(err.errors).map(val => val.message).join(', ')
        });
    }

    // Handle MongoDB duplicate key error
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: `Duplicate key error. A record with this value already exists.`
        });
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid token. Please login again.'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Your token has expired. Please login again.'
        });
    }

    // Default to 500 server error
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};

export default errorHandler;
