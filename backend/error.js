const createError = (status, message ,res) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    // return err;
    return res.status(status).json({
        success: false,
        status,
        message,
    });

}

module.exports = { createError }