/**
 * Created on 23.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const sortCommandsByScope = require('../sortCommandsByScope');

/**
 * Executes the function
 * @param {*} params : *
 * @returns {function(): Array} : The sorted commands
 */
const execution = (...params) => () => sortCommandsByScope(...params);

describe('sortCommandsByScope', () => {
    it('Should be a function', () => {
        expect(sortCommandsByScope).to.be.an.instanceOf(Function);
    });

    it('Should throw when no array is specified', () => {
        expect(execution([])).not.to.throw();
        expect(execution(true)).to.throw();
        expect(execution(null)).to.throw();
        expect(execution('test')).to.throw();
    });

    it('Should sort the commands by scope', () => {
        const commands = [
            {
                name: 'p',
                scope: 'scope',
            },
            {
                name: 'b',
                scope: 'scope',
            },
            {
                name: 'd',
                scope: 'scope',
            },
            {
                name: 'e',
                scope: 'scope/b',
            },
            {
                name: 'g',
                scope: 'scope/c',
            },
            {
                name: 'f',
                scope: 'scope/b',
            },
            {
                name: 'r',
                scope: 'scope/a',
            },
            {
                name: 'a',
                scope: 'scope/a',
            },
            {
                name: 'c',
                scope: 'scope/a',
            },
            {
                name: 'test',
                scope: '',
            },
        ];

        expect(sortCommandsByScope(commands)).to.deep.equal([
            {
                level: 0,
                name: 'test',
                scope: '',
            },
            {
                level: 1,
                name: 'b',
                scope: 'scope',
            },
            {
                level: 1,
                name: 'd',
                scope: 'scope',
            },
            {
                level: 1,
                name: 'p',
                scope: 'scope',
            },
            {
                level: 2,
                name: 'a',
                scope: 'a',
            },
            {
                level: 2,
                name: 'c',
                scope: 'a',
            },
            {
                level: 2,
                name: 'r',
                scope: 'a',
            },
            {
                level: 2,
                name: 'e',
                scope: 'b',
            },
            {
                level: 2,
                name: 'f',
                scope: 'b',
            },
            {
                level: 2,
                name: 'g',
                scope: 'c',
            },
        ]);
    });
});
