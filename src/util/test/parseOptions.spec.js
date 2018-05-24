/**
 * Created on 23.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const parseOptions = require('../parseOptions');

describe('parseOptions', () => {
    it('Should parse an option', () => {
        const parsed = parseOptions(['-f', 'foo']);

        expect(parsed).to.have.property('-f', 'foo');
    });

    it('Should parse multiple options', () => {
        const parsed = parseOptions(['-f', 'foo', '-b', 'bar', '-z', 'baz', '--test', 'true']);

        expect(parsed).to.have.property('-f', 'foo');
        expect(parsed).to.have.property('-b', 'bar');
        expect(parsed).to.have.property('-z', 'baz');
        expect(parsed).to.have.property('--test', 'true');
    });

    it('Should parse a shortcut option', () => {
        const parsed = parseOptions(['-f']);

        expect(parsed).to.have.property('-f', true);
    });

    it('Should parse multiple shortcut options', () => {
        const parsed = parseOptions(['-f', 'foo', '-b', '-z', 'baz', '-r', '-v', '1', '--test', '--ab', 'cde', '--gh']);

        expect(parsed).to.have.property('-f', 'foo');
        expect(parsed).to.have.property('-b', true);
        expect(parsed).to.have.property('-z', 'baz');
        expect(parsed).to.have.property('-r', true);
        expect(parsed).to.have.property('-v', '1');
        expect(parsed).to.have.property('--test', true);
        expect(parsed).to.have.property('--ab', 'cde');
        expect(parsed).to.have.property('--gh', true);
    });

    it('Should add unknown params to params array', () => {
        const parsed = parseOptions(['-f', 'foo', 'hello', 'world', '--track']);

        expect(parsed).to.have.property('-f', 'foo');
        expect(parsed).to.have.property('--track', true);
        expect(parsed).to.have.property('params').with.lengthOf(2);
        expect(parsed.params).to.include('hello');
        expect(parsed.params).to.include('world');
    });
});
