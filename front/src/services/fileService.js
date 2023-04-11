import axios from 'axios';

const getFileList = async (params = {}) => {
    try {
        const { filename } = params;

        let url = 'http://localhost:5000/v1/files/data';
        if (filename) url = `${url}?fileName=${filename}`;

        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        return error.response;
    }
};

const FileService = {
    getFileList,
}

export default FileService;
