/**
 * Created on 23.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const resolveFileNameFromPathWithoutEnding = require('../resolveFileNameFromPathWithoutEnding');

describe('resolveFileNameFromPathWithoutEnding', () => {
    it('Should be a function', () => {
        expect(resolveFileNameFromPathWithoutEnding).to.be.an.instanceOf(Function);
    });

    it('Should resolve the file name without ending', () => {
        expect(resolveFileNameFromPathWithoutEnding('file.end')).to.equal('file');
        expect(resolveFileNameFromPathWithoutEnding('file')).to.equal('file');
        expect(resolveFileNameFromPathWithoutEnding('.env')).to.equal('.env');
        expect(resolveFileNameFromPathWithoutEnding('.env.private')).to.equal('.env');
        expect(resolveFileNameFromPathWithoutEnding('test.spec.js')).to.equal('test.spec');

        expect(resolveFileNameFromPathWithoutEnding('/my/test/path/file.end')).to.equal('file');
        expect(resolveFileNameFromPathWithoutEnding('/my/test/path/file')).to.equal('file');
        expect(resolveFileNameFromPathWithoutEnding('/my/test/path/.env')).to.equal('.env');
        expect(resolveFileNameFromPathWithoutEnding('/my/test/path/.env.private')).to.equal('.env');
        expect(resolveFileNameFromPathWithoutEnding('/my/test/path/test.spec.js')).to.equal('test.spec');
        expect(resolveFileNameFromPathWithoutEnding('foo')).to.equal('foo');
    });

    it('Should return null when no valid file name is specified', () => {
        expect(resolveFileNameFromPathWithoutEnding('/path/to/file/')).to.be.null;
        expect(resolveFileNameFromPathWithoutEnding('/')).to.be.null;
        expect(resolveFileNameFromPathWithoutEnding('')).to.be.null;
    });

    it('Should throw when no string is passed', () => {
        /**
         * Returns a function that calls resolveFileNameFromPath with the param
         * @param {*} param : * : The param
         * @returns {function(): String} : The function
         */
        const passAParameter = param => () => resolveFileNameFromPathWithoutEnding(param);

        expect(passAParameter(null)).to.throw();
        expect(passAParameter(1)).to.throw();
        expect(passAParameter(true)).to.throw();
        expect(passAParameter('foo')).not.to.throw();
    });
});
