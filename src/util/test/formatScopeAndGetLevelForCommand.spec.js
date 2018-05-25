/**
 * Created on 23.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const formatScopeAndGetLevelForCommand = require('../formatScopeAndGetLevelForCommand');

/**
 * Executes the function
 * @param {*} params : *
 * @returns {function(): Object} : The tabs
 */
const execution = (...params) => () => formatScopeAndGetLevelForCommand(...params);

describe('formatScopeAndGetLevelForCommand', () => {
    it('Should be a function', () => {
        expect(formatScopeAndGetLevelForCommand).to.be.an.instanceOf(Function);
    });

    it('Should throw when no string is specified', () => {
        expect(execution(1)).to.throw();
        expect(execution(true)).to.throw();
        expect(execution(null)).to.throw();
        expect(execution('1')).not.to.throw();
    });

    it('Should return the displayed scope at level 0', () => {
        const formatted = formatScopeAndGetLevelForCommand('');

        expect(formatted).to.have.property('scope', '');
        expect(formatted).to.have.property('level', 0);

        const formattedSlash = formatScopeAndGetLevelForCommand('/');

        expect(formattedSlash).to.have.property('scope', '');
        expect(formattedSlash).to.have.property('level', 0);
    });

    it('Should return the displayed scope at level 1', () => {
        const formatted = formatScopeAndGetLevelForCommand('test');

        expect(formatted).to.have.property('scope', 'test');
        expect(formatted).to.have.property('level', 1);

        const formattedSlash = formatScopeAndGetLevelForCommand('/test');

        expect(formattedSlash).to.have.property('scope', 'test');
        expect(formattedSlash).to.have.property('level', 1);
    });

    it('Should return the displayed scope at level 2', () => {
        const formatted = formatScopeAndGetLevelForCommand('my/testScope');

        expect(formatted).to.have.property('scope', 'testScope');
        expect(formatted).to.have.property('level', 2);

        const formattedSlash = formatScopeAndGetLevelForCommand('/my/testScope');

        expect(formattedSlash).to.have.property('scope', 'testScope');
        expect(formattedSlash).to.have.property('level', 2);
    });

    it('Should return the displayed scope at level 3', () => {
        const formatted = formatScopeAndGetLevelForCommand('foo/bar/baz');

        expect(formatted).to.have.property('scope', 'baz');
        expect(formatted).to.have.property('level', 3);

        const formattedSlash = formatScopeAndGetLevelForCommand('/foo/bar/baz');

        expect(formattedSlash).to.have.property('scope', 'baz');
        expect(formattedSlash).to.have.property('level', 3);
    });

    it('Should return the displayed scope at level 10', () => {
        const formatted = formatScopeAndGetLevelForCommand('foo/bar/baz/bli/bla/blo/blu/boo/aaa/xxx');

        expect(formatted).to.have.property('scope', 'xxx');
        expect(formatted).to.have.property('level', 10);

        const formattedSlash = formatScopeAndGetLevelForCommand('/foo/bar/baz/bli/bla/blo/blu/boo/aaa/xxx');

        expect(formattedSlash).to.have.property('scope', 'xxx');
        expect(formattedSlash).to.have.property('level', 10);
    });
});
