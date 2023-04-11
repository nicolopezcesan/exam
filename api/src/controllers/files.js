const filesService = require('../services/files');
const { ERROR_MESSAGE } = require('../constants/index');

const getFilenamesListController = async () => {
  try {
    const response = await filesService.getFilenamesList();
    return response;
  } catch (error) {
    throw new Error(ERROR_MESSAGE.GET_FILE_LIST);
  }
};

const getFileDataController = async (params) => {
  try {
    const response = await filesService.getFileData(params);
    return response;
  } catch (error) {
    throw new Error(ERROR_MESSAGE.GET_FILE_DATA);
  }
};


module.exports = {
  getFilenamesListController,
  getFileDataController
}