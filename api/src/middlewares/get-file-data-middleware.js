const { getFileData } = require('../services/files');
const { ERROR_MESSAGE } = require('../constants/index');

const formatFileData = (fileLines) => {
    if (!fileLines) return [];

    const splittedLines = fileLines.split(/\r?\n/);

    return splittedLines.map((fields) => {
        const [file, text, number, hex] = fields.split(',');
        return { file, text, number, hex };
    });
}

module.exports.getFileDataMiddleware = async (req, res, next) => {
    const { fileName } = req.query;
    const { files } = req.filenamesList;

    let fileList = [...files];

    if (fileName) {
        const fileIsAvailable = files.find(f => f === fileName);

        if (!fileIsAvailable) {
            const error = new Error(ERROR_MESSAGE.FILE_IS_NOT_AVAILABLE);
            return next(error);
        }

        fileList = [fileName];
    }

    const fileListPromises = fileList.map(filename => getFileData(filename));

    const fileListResponses = await Promise.allSettled(fileListPromises);

    const formattedData = fileListResponses.map((fileData, i) => {
        return {
            file: fileList[i],
            lines: formatFileData(fileData.value),
        }
    });

    req.filesData = formattedData;
    next();
}