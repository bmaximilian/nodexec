/**
 * Created on 28.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { expect } = require('chai');
const { describe, it } = require('mocha');
const toCamelCase = require('../toCamelCase');

/**
 * Executes the function
 * @param {*} params : *
 * @returns {function(): String} : The converted string
 */
const execution = (...params) => () => toCamelCase(...params);

describe('toCamelCase', () => {
    it('Should be a function', () => {
        expect(toCamelCase).to.be.an.instanceOf(Function);
    });

    it('Should throw when no string is specified', () => {
        expect(execution('hallo')).not.to.throw();
        expect(execution(true)).to.throw();
        expect(execution(null)).to.throw();
        expect(execution(1)).to.throw();
    });

    it('Should convert a low dash string to a camel case string', () => {
        expect(toCamelCase('hallo_welt')).to.equal('halloWelt');
        expect(toCamelCase('hallo__welt')).to.equal('halloWelt');
        expect(toCamelCase('hallo_Welt')).to.equal('halloWelt');
    });

    it('Should convert a double dot string to a camel case string', () => {
        expect(toCamelCase('hallo:welt')).to.equal('halloWelt');
        expect(toCamelCase('hallo::welt')).to.equal('halloWelt');
        expect(toCamelCase('hallo:Welt')).to.equal('halloWelt');
    });

    it('Should convert a dash string to a camel case string', () => {
        expect(toCamelCase('hallo-welt')).to.equal('halloWelt');
        expect(toCamelCase('hallo--welt')).to.equal('halloWelt');
        expect(toCamelCase('hallo-Welt')).to.equal('halloWelt');
    });

    it('Should leave completely uppercase values uppercase', () => {
        expect(toCamelCase('HALLO_WELT')).to.equal('HALLO_WELT');
        expect(toCamelCase('HALLOWELT')).to.equal('HALLOWELT');
        expect(toCamelCase('HALLO:WELT')).to.equal('HALLO:WELT');
        expect(toCamelCase('HALLO-WELT')).to.equal('HALLO-WELT');
    });

    it('Should convert all low dash separations in a string to camel case', () => {
        expect(toCamelCase('hallo_welt_hallo_welt')).to.equal('halloWeltHalloWelt');
        expect(toCamelCase('camel_case_camelCase')).to.equal('camelCaseCamelCase');
    });

    it('Should convert all double dot separations in a string to camel case', () => {
        expect(toCamelCase('hallo:welt:hallo:welt')).to.equal('halloWeltHalloWelt');
        expect(toCamelCase('camel:case:camelCase')).to.equal('camelCaseCamelCase');
    });

    it('Should convert all dash separations in a string to camel case', () => {
        expect(toCamelCase('hallo-welt-hallo-welt')).to.equal('halloWeltHalloWelt');
        expect(toCamelCase('camel-case-camelCase')).to.equal('camelCaseCamelCase');
    });

    it('Should convert all mixed separations in a string to camel case', () => {
        expect(toCamelCase('hallo-welt_hallo:welt')).to.equal('halloWeltHalloWelt');
        expect(toCamelCase('camel::case_camelCase')).to.equal('camelCaseCamelCase');
    });

    it('Should ignore trailing underscores', () => {
        expect(toCamelCase('_Camel_Case')).to.equal('_CamelCase');
        expect(toCamelCase('_camel_Case')).to.equal('_camelCase');
        expect(toCamelCase('__camel_Case')).to.equal('__camelCase');
        expect(toCamelCase('__camel:Case')).to.equal('__camelCase');
        expect(toCamelCase('__camel-Case')).to.equal('__camelCase');
    });
});
