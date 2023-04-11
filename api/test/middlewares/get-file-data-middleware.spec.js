const { expect } = require('chai');
const nock = require('nock');

const { getFileDataMiddleware } = require('../../src/middlewares/get-file-data-middleware');
const { ERROR_MESSAGE } = require('../../src/constants');
const { EXTERNAL_API: { BASE_URL } } = require('../../src/config');

describe('Middleware - getFileDataMiddleware', async () => {
    describe('Errors', () => {
        it('Should return FILE_IS_NOT_AVAILABLE error when file is not available', async () => {
            const request = {
                query: { fileName: 'unknown' },
                filenamesList: { files: ['test.csv'] },
            };

            try {
                await getFileDataMiddleware(request, {}, (err) => { throw err });
            } catch (error) {
                expect(error.message).to.be.equal(ERROR_MESSAGE.FILE_IS_NOT_AVAILABLE);
            }
        });
    });

    describe('Successfull', () => {
        const file1 = 'test1.csv', file2 = 'file2', file3 = 'file3', file4 = 'file4';
        const fakeResponse = 'file,text,number,hex';
        let nockMock1, nockMock2, nockMock3, nockMock4;

        before(() => {
            nockMock1 = nock(BASE_URL)
                .get(`/file/${file1}`)
                .reply(200, fakeResponse);
            nockMock2 = nock(BASE_URL)
                .get(`/file/${file2}`)
                .reply(200, fakeResponse);
            nockMock3 = nock(BASE_URL)
                .get(`/file/${file3}`)
                .reply(200, fakeResponse);
            nockMock4 = nock(BASE_URL)
                .get(`/file/${file4}`)
                .reply(200, fakeResponse);
        });

        it('Should return the data of the specific file requested', async () => {
            const request = {
                query: {},
                filenamesList: {
                    files: [file1]
                },
            };

            await getFileDataMiddleware(request, {}, () => { });

            expect(request).to.have.property('filesData');
            expect(request.filesData.length).to.be.equal(1);
            expect(request.filesData[0].lines[0]).to.have.all.keys('file', 'text', 'number', 'hex');
            nockMock1.done();
        });

        it('Should return data of the all available files', async () => {
            const request = {
                query: {},
                filenamesList: {
                    files: ['file2', 'file3', 'file4'],
                },
            };

            await getFileDataMiddleware(request, {}, () => { });

            expect(request).to.have.property('filesData');
            expect(request.filesData.length).to.be.equal(3);
            nockMock2.done();
            nockMock3.done();
            nockMock4.done();
        });
    });
});