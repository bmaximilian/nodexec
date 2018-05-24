/**
 * Created on 23.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const resolveFileNameFromPath = require('../resolveFileNameFromPath');

describe('resolveFileNameFromPath', () => {
    it('Should be a function', () => {
        expect(resolveFileNameFromPath).to.be.an.instanceOf(Function);
    });

    it('Should resolve the file name from a path', () => {
        expect(resolveFileNameFromPath('/my/test/path/file.end')).to.equal('file.end');
        expect(resolveFileNameFromPath('/my/test/path/file')).to.equal('file');
        expect(resolveFileNameFromPath('/my/test/path/.env')).to.equal('.env');
        expect(resolveFileNameFromPath('foo')).to.equal('foo');
    });

    it('Should return null when the path contains no file', () => {
        expect(resolveFileNameFromPath('/my/test/path/file/')).to.be.null;
        expect(resolveFileNameFromPath('/')).to.be.null;
    });

    it('Should throw when no string is passed', () => {
        /**
         * Returns a function that calls resolveFileNameFromPath with the param
         * @param {*} param : * : The param
         * @returns {function(): String} : The function
         */
        const passAParameter = param => () => resolveFileNameFromPath(param);

        expect(passAParameter(null)).to.throw();
        expect(passAParameter(1)).to.throw();
        expect(passAParameter(true)).to.throw();
        expect(passAParameter('foo')).not.to.throw();
    });
});
