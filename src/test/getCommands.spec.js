/**
 * Created on 23.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const paths = require('../util/paths');
const getCommands = require('../getCommands');

/**
 * Executes the function
 * @param {*} config : *
 * @returns {function(): Object} : The commands
 */
const execution = config => () => getCommands(config);

describe('getCommands', () => {
    it('Should be a function', () => {
        expect(getCommands).to.be.an.instanceOf(Function);
    });

    it('Should get all commands based on a specific function', () => {
        const config = {
            directories: [
                paths.resolvePathFromApp('commands'),
            ],
        };

        const commands = getCommands(config);
        expect(commands).to.have.property('config:create');
        expect(commands).to.have.property('say:hello');
    });

    it('Should throw without a valid configuration', () => {
        const config = {
            directories: 'hi',
        };

        expect(execution(config)).to.throw();
    });

    it('Should not throw with a empty configuration', () => {
        const config = {};

        expect(execution(config)).not.to.throw();
    });
});
