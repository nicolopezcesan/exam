
const errorHandlerMiddleware = (err, req, res, next) => {
    res.status(400).send({ code: 'ERROR', message: err.message })
};

module.exports = {
    errorHandlerMiddleware,
};