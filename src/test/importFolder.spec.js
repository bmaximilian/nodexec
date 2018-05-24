/**
 * Created on 23.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const importFolder = require('../importFolder');

/**
 * Executes the function
 * @param {*} path : *
 * @returns {function(): Object} : The commands
 */
const execution = path => () => importFolder(path);

describe('importFolder', () => {
    it('Should be a function', () => {
        expect(importFolder).to.be.an.instanceOf(Function);
    });

    it('Should get all commands based on a specific function', () => {
        const commands = importFolder('commands');
        expect(commands).to.have.property('config:create');
        expect(commands).to.have.property('say:hello');
    });

    it('Should throw without a valid configuration', () => {
        expect(execution()).to.throw();
        expect(execution(1)).to.throw();
        expect(execution(true)).to.throw();
    });
});
