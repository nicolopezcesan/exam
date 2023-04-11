module.exports = Object.freeze({
    PORT: process.env.PORT || 5000,
    HOST: process.env.HOST || '0.0.0.0',
    EXTERNAL_API: {
        BASE_URL: process.env.EXTERNAL_API_BASE_URL || 'https://echo-serv.tbxnet.com/v1/secret',
        HEADERS: {
            Authorization: process.env.HEADER_AUTHORIZATION || 'Bearer aSuperSecretKey',
            'Content-type': process.env.HEADER_CONTENT_TYPE || 'application-json',
        },
    },
});