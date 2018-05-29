/**
 * Created on 23.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const findMatchingCommands = require('../findMatchingCommands');

/**
 * Executes the function
 * @param {*} params : *
 * @returns {function(): String[]} : The commands
 */
const execution = (...params) => () => findMatchingCommands(...params);

describe('findMatchingCommands', () => {
    it('Should be a function', () => {
        expect(findMatchingCommands).to.be.an.instanceOf(Function);
    });

    it('Should throw when no object is specified a parameter 1', () => {
        expect(execution({}, '')).not.to.throw();
        expect(execution(true, '')).to.throw();
        expect(execution(null, '')).to.throw();
        expect(execution('test', '')).to.throw();
    });

    it('Should throw when no string is specified a parameter 2', () => {
        expect(execution({}, '')).not.to.throw();
        expect(execution({}, true)).to.throw();
        expect(execution({}, null)).to.throw();
        expect(execution({}, 1)).to.throw();
    });

    it('Should search for equal commands', () => {
        const found = findMatchingCommands({
            'test:function': {},
            foo: {},
        }, 'est');
        expect(found).to.include('test:function');
        expect(found).not.to.include('foo');
    });
});
