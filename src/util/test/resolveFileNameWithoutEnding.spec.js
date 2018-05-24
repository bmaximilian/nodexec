/**
 * Created on 23.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const resolveFileNameWithoutEnding = require('../resolveFileNameWithoutEnding');

describe('resolveFileNameWithoutEnding', () => {
    it('Should be a function', () => {
        expect(resolveFileNameWithoutEnding).to.be.an.instanceOf(Function);
    });

    it('Should resolve the file name without ending', () => {
        expect(resolveFileNameWithoutEnding('file.end')).to.equal('file');
        expect(resolveFileNameWithoutEnding('file')).to.equal('file');
        expect(resolveFileNameWithoutEnding('.env')).to.equal('.env');
        expect(resolveFileNameWithoutEnding('.env.private')).to.equal('.env');
        expect(resolveFileNameWithoutEnding('test.spec.js')).to.equal('test.spec');
    });

    it('Should return null when no valid file name is specified', () => {
        expect(resolveFileNameWithoutEnding('/path/to/file/')).to.be.null;
        expect(resolveFileNameWithoutEnding('/')).to.be.null;
        expect(resolveFileNameWithoutEnding('')).to.be.null;
    });

    it('Should throw when no string is passed', () => {
        /**
         * Returns a function that calls resolveFileNameFromPath with the param
         * @param {*} param : * : The param
         * @returns {function(): String} : The function
         */
        const passAParameter = param => () => resolveFileNameWithoutEnding(param);

        expect(passAParameter(null)).to.throw();
        expect(passAParameter(1)).to.throw();
        expect(passAParameter(true)).to.throw();
        expect(passAParameter('foo')).not.to.throw();
    });
});
