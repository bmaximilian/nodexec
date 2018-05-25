/**
 * Created on 23.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const getTabsForLevel = require('../getTabsForLevel');

/**
 * Executes the function
 * @param {*} params : *
 * @returns {function(): String} : The tabs
 */
const execution = (...params) => () => getTabsForLevel(...params);

describe('getTabsForLevel', () => {
    it('Should be a function', () => {
        expect(getTabsForLevel).to.be.an.instanceOf(Function);
    });

    it('Should throw when no integer is specified', () => {
        expect(execution(1)).not.to.throw();
        expect(execution(true)).to.throw();
        expect(execution(null)).to.throw();
        expect(execution('test')).to.throw();
    });

    it('Should return the desired tab string', () => {
        expect(getTabsForLevel(0)).to.equal('');
        expect(getTabsForLevel(1)).to.equal('\t');
        expect(getTabsForLevel(2)).to.equal('\t\t');
        expect(getTabsForLevel(10)).to.equal('\t\t\t\t\t\t\t\t\t\t');
    });
});
