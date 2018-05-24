/**
 * Created on 23.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const mergeConfig = require('../mergeConfig');

/**
 * Executes the function
 * @param {*} params : *
 * @returns {function(): Object} : The config
 */
const execution = (...params) => () => mergeConfig(...params);

describe('mergeConfig', () => {
    it('Should be a function', () => {
        expect(mergeConfig).to.be.an.instanceOf(Function);
    });

    it('Should merge two configs', () => {
        const baseConf = {
            directories: [
                'a',
                'b',
                'c',
            ],
            other: 'test',
            override: 'foo',
            nested: {
                foo: 'bar',
            },
            nestedOverride: {
                bla: 'foo',
            },
        };

        const addConf = {
            directories: [
                'b',
                'd',
                'e',
                'f',
            ],
            another: 'baz',
            override: 'bar',
            nestedOverride: {
                foo: 'fi',
            },
        };

        const merged = mergeConfig(baseConf, addConf);
        expect(merged).to.have.property('directories').with.lengthOf(6);
        expect(merged.directories).to.include('a');
        expect(merged.directories).to.include('b');
        expect(merged.directories).to.include('c');
        expect(merged.directories).to.include('d');
        expect(merged.directories).to.include('e');
        expect(merged.directories).to.include('f');

        expect(merged).to.have.property('other', 'test');
        expect(merged).to.have.property('another', 'baz');
        expect(merged).to.have.property('override', 'bar');

        expect(merged).to.have.property('nested');
        expect(merged.nested).to.have.property('foo', 'bar');

        expect(merged).to.have.property('nestedOverride');
        expect(merged.nestedOverride).to.have.property('foo', 'fi');
    });

    it('Should throw without a valid configuration', () => {
        expect(execution(null, null)).to.throw();
        expect(execution(1, 1)).to.throw();
        expect(execution({}, 1)).to.throw();
        expect(execution(1, {})).to.throw();

        expect(execution({}, null)).not.to.throw();
    });
});
