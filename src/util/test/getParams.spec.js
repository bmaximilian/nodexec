/**
 * Created on 26.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const getParams = require('../getParams');

/**
 * Executes the function
 * @param {*} args : *
 * @returns {function(): String} : The param
 */
const execution = (...args) => () => getParams(...args);

describe('getParams', () => {
    it('Should be a function', () => {
        expect(getParams).to.be.an.instanceOf(Function);
    });

    it('Should throw when no object is specified in parameter 1', () => {
        expect(execution({}, [])).not.to.throw();
        expect(execution(true, [])).to.throw();
        expect(execution(null, [])).to.throw();
        expect(execution()).to.throw();
        expect(execution('test', [])).to.throw();
    });

    it('Should throw when no array is specified in parameter 2', () => {
        expect(execution({}, [])).not.to.throw();
        expect(execution({}, true)).to.throw();
        expect(execution({}, null)).to.throw();
        expect(execution({}, 'test')).to.throw();
    });

    it('Should return the parameter', () => {
        expect(getParams({ '-d': '/etc/command' }, ['-d'])).to.equal('/etc/command');
        expect(getParams({ '--directory': '/etc/command' }, ['--directory'])).to.equal('/etc/command');
    });

    it('Should return the fallback at multiple levels', () => {
        expect(getParams({ '-d': '/etc/command' }, ['-a', '-d'])).to.equal('/etc/command');
        expect(getParams(
            { '--foo': null, '--directory': '/etc/command' },
            ['-a', '--foo', '--directory'],
        )).to.equal('/etc/command');
    });
});
