/**
 * Created on 23.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const getCommandNames = require('../getCommandNames');

describe('getCommandNames', () => {
    it('Should be a function', () => {
        expect(getCommandNames).to.be.an.instanceOf(Function);
    });

    it('Should return always an array', () => {
        expect(getCommandNames()).to.be.an.instanceOf(Array);
        expect(getCommandNames(null, null)).to.be.an.instanceOf(Array);
        expect(getCommandNames(null, {})).to.be.an.instanceOf(Array);
        expect(getCommandNames('abc', null)).to.be.an.instanceOf(Array);
        expect(getCommandNames('def', {})).to.be.an.instanceOf(Array);
    });

    it('Should return the standard name in an array', () => {
        const output = getCommandNames('abc', null);

        expect(output).to.have.lengthOf(1);
        expect(output).to.contain('abc');
    });

    it('Should return the object name in an array', () => {
        const output = getCommandNames(null, { name: 'def' });

        expect(output).to.have.lengthOf(1);
        expect(output).to.contain('def');
    });

    it('Should return the object aliases in an array', () => {
        const output = getCommandNames(null, { aliases: ['ghi', 'jkl'] });

        expect(output).to.have.lengthOf(2);
        expect(output).to.contain('ghi');
        expect(output).to.contain('jkl');
    });

    it('Should merge the names together', () => {
        const output = getCommandNames('abc', {
            name: 'def',
            aliases: [
                'ghi',
                'jkl',
                'helloWorld',
            ],
        });

        expect(output).to.have.lengthOf(5);
        expect(output).to.contain('abc');
        expect(output).to.contain('def');
        expect(output).to.contain('ghi');
        expect(output).to.contain('jkl');
        expect(output).to.contain('helloWorld');
    });

    it('Should trim all whitespaces', () => {
        expect(getCommandNames('hello World')).to.contain('helloWorld');
        expect(getCommandNames(null, { name: 'give Me Fanta' })).to.contain('giveMeFanta');

        const output = getCommandNames(null, {
            aliases: [
                'give Me Fanta',
                'give Me Sprite',
                'give Me Beer',
            ],
        });
        expect(output).to.have.lengthOf(3);
        expect(output).to.contain('giveMeFanta');
        expect(output).to.contain('giveMeSprite');
        expect(output).to.contain('giveMeBeer');
    });
});
