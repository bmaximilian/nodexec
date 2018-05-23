/**
 * Created on 23.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const isRelativePath = require('../isRelativePath');

describe('isRelativePath', () => {
    it('Should identify relative paths', () => {
        expect(isRelativePath('/my/absolute/path/file.end')).to.be.false;
        expect(isRelativePath('my/absolute/path/file.end')).to.be.true;
        expect(isRelativePath('~/my/absolute/path/file.end')).to.be.true;
    });
});
