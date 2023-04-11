const { getFilenamesListController } = require('../controllers/files');

module.exports.getFilenamesListMiddleware = async (req, res, next) => {
    try {
        req.filenamesList = await getFilenamesListController();
        next();
    } catch (error) {
        next(error);
    }
}