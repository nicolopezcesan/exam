const { getFilenamesListMiddleware } = require('./get-filenames-list-middleware');
const { getFileDataMiddleware } = require('./get-file-data-middleware');
const { responseFilenamesListMiddleware } = require('./responses/response-filenames-list-middleware');
const { responseFileDataMiddleware } = require('./responses/response-file-data-middleware');

module.exports.getFilenamesList = [
    getFilenamesListMiddleware,
    responseFilenamesListMiddleware,
];

module.exports.getFilesData = [
    getFilenamesListMiddleware,
    getFileDataMiddleware,
    responseFileDataMiddleware,
];