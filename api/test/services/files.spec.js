const { expect } = require('chai');
const nock = require('nock');

const { EXTERNAL_API: { BASE_URL } } = require('../../src/config');
const { nockGetFilenamesLisResponseOK, nockGetFileDataResponseOK } = require('../nocks');
const { getFilenamesList, getFileData, } = require('../../src/services/files');


describe('Services', async () => {

    describe('getFilenamesList Service', async () => {
        let nockMock;

        before(() => {
            nockMock = nock(BASE_URL)
                .get('/files')
                .reply(200, nockGetFilenamesLisResponseOK);
        });

        it('Should return an array of String filenames when the response is success', async () => {
            const response = await getFilenamesList();

            expect(response).to.have.property('files');
            expect(response.files).to.be.an('array');
            const isAllString = response.files.every(f => typeof f === 'string')
            expect(isAllString).to.be.equal(true);
            nockMock.done();
        });

    });

    describe('getFileData Service', async () => {
        const fakeFile = 'test1.csv';
        let nockMock;

        before(() => {
            nockMock = nock(BASE_URL)
                .get(`/file/${fakeFile}`)
                .reply(200, nockGetFileDataResponseOK);
        });

        it('Should return an String when the response is success', async () => {
            const response = await getFileData(fakeFile);
            expect(typeof response === 'string').to.be.true;
            nockMock.done();
        });
    });
});