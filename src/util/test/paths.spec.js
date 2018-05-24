/**
 * Created on 23.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const paths = require('../paths');

describe('paths', () => {
    it('Should contain the base config path', () => {
        expect(paths).to.have.property('baseConfig');

        /* eslint-disable import/no-dynamic-require, global-require */
        /**
         * Requires the config
         * @return {Object} : The base config
         */
        const requireBaseConfig = () => require(paths.baseConfig);

        expect(requireBaseConfig).not.to.throw();

        const config = requireBaseConfig();

        expect(config).not.to.be.null;
        expect(config).to.have.property('directories');
    });

    it('Should contain the user config path', () => {
        expect(paths).to.have.property('userConfig');

        /* eslint-disable import/no-dynamic-require, global-require */
        /**
         * Requires the config
         * @return {Object} : The user config
         */
        const requireUserConfig = () => require(paths.userConfig);

        expect(requireUserConfig).not.to.throw();

        const config = requireUserConfig();

        expect(config).not.to.be.null;
    });

    it('Should contain the app directory', () => {
        expect(paths).to.have.property('appDirectory');
        expect(paths.appDirectory).not.to.be.null;
    });

    it('Should contain a function to resolve paths relative to the app directory', () => {
        expect(paths).to.have.property('resolvePathFromApp');
        expect(paths.resolvePathFromApp).to.be.an.instanceOf(Function);
        expect(paths.resolvePathFromApp('src')).not.to.be.null;
    });
});
