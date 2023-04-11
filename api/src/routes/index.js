const Router = require('express').Router;
const router = Router();

const { getFilenamesList, getFilesData } = require('../middlewares');

router.get('/files/list', getFilenamesList);

router.get('/files/data', getFilesData);

module.exports = router;