const { expect } = require('chai');
const nock = require('nock');

const { getFilenamesListController, getFileDataController } = require('../../src/controllers/files');
const { EXTERNAL_API: { BASE_URL } } = require('../../src/config');
const { ERROR_MESSAGE } = require('../../src/constants');

describe('Controllers', async () => {

    describe('getFilenamesListController', async () => {
        const fakeResponse = true;
        let nockMockOk, nockMockError;

        before(() => {
            nockMockOk = nock(BASE_URL)
                .get('/files')
                .reply(200, fakeResponse);

            nockMockError = nock(BASE_URL)
                .get('/files')
                .reply(404);
        });

        it('Should return received value when the response is success', async () => {
            const response = await getFilenamesListController();
            expect(response).to.be.equal(fakeResponse);
            nockMockOk.done();
        });

        it('Should return GET_FILE_LIST error when the service fail', async () => {
            try {
                await getFilenamesListController();
            } catch (error) {
                expect(error.message).to.be.equal(ERROR_MESSAGE.GET_FILE_LIST);
                nockMockError.done();
            }
        });

    });

    describe('getFileDataController', async () => {
        const fakeOkResponse = true;
        const fakeFilename = 'unknownFile';
        let nockMockOk, nockMockError;

        before(() => {
            nockMockOk = nock(BASE_URL)
                .get(`/file/${fakeFilename}`)
                .reply(200, fakeOkResponse);

            nockMockError = nock(BASE_URL)
                .get(`/file/${fakeFilename}`)
                .reply(404);
        });

        it('Should return received value when the response is success', async () => {
            const response = await getFileDataController(fakeFilename);
            expect(response).to.be.equal(fakeOkResponse);
            nockMockOk.done();
        });

        it('Should return GET_FILE_DATA error when the service fail', async () => {
            try {
                await getFileDataController(fakeFilename);
            } catch (error) {
                expect(error.message).to.be.equal(ERROR_MESSAGE.GET_FILE_DATA);
                nockMockError.done();
            }
        });

    });
});