export function errorHandler(err, req, res, next) {

    console.log(err);

    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        message: err.message || "Internal server error."
    });
}