/**
 * Created on 26.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const getDirectory = require('../getDirectory');

/**
 * Executes the function
 * @param {*} config : *
 * @returns {function(): Object} : The commands
 */
const execution = config => () => getDirectory(config);

describe('getDirectory', () => {
    it('Should be a function', () => {
        expect(getDirectory).to.be.an.instanceOf(Function);
    });

    it('Should throw when no object is specified', () => {
        expect(execution({})).not.to.throw();
        expect(execution(true)).to.throw();
        expect(execution(null)).to.throw();
        expect(execution('test')).to.throw();
    });

    it('Should not manipulate an absolute path', () => {
        expect(getDirectory({ '-d': '/etc/command' })).to.equal('/etc/command');
        expect(getDirectory({ '--directory': '/etc/command' })).to.equal('/etc/command');
    });

    it('Should turn a relative path into an absolute path', () => {
        expect(getDirectory({ '-d': 'commands' })).to.equal(`${process.cwd()}/commands`);
        expect(getDirectory({ '--directory': 'commands' })).to.equal(`${process.cwd()}/commands`);
    });

    it('Should should return the current working directory when no directory specified', () => {
        expect(getDirectory({})).to.equal(process.cwd());
    });
});
