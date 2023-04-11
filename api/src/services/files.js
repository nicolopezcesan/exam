const axios = require('axios');
const { EXTERNAL_API: { BASE_URL, HEADERS } } = require('../../src/config');

const config = {
    headers: HEADERS,
};

const getFilenamesList = async () => {
    const url = `${BASE_URL}/files`;
    const { data } = await axios.get(url, config);
    return data;
};

const getFileData = async (filename) => {
    const url = `${BASE_URL}/file/${filename}`;
    const { data } = await axios.get(url, config);
    return data;
}

module.exports = {
    getFilenamesList,
    getFileData,
}