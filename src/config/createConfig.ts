import cosmiconfig from 'cosmiconfig';
import mergeConfiguration from 'merge-configuration';
import pkgDir from 'pkg-dir';
import { oc } from 'ts-optchain.macro';
import defaultConfig from './defaultConfig';
import { Config, Option, Options } from '../types';

export default function createConfig(
  options: Options = {},
  customConfig: Partial<Config> = {}
): Config {
  const rootPath = pkgDir.sync(process.cwd()) || process.cwd();
  options = sanitizeOptions(options);
  const userConfig: Partial<Config> = oc(
    cosmiconfig('vkbeautify').searchSync(rootPath)
  ).config({});
  let config = mergeConfiguration(defaultConfig, userConfig);
  config = mergeConfiguration(config, customConfig);
  const indentPattern =
    (options.indentPattern &&
      options.indentPattern.length &&
      options.indentPattern[0] === ' ') ||
    isNaN(Number(options.indentPattern))
      ? options.indentPattern
      : Number(options.indentPattern);
  config = {
    ...config,
    indentPattern:
      indentPattern || typeof indentPattern === 'number'
        ? indentPattern
        : config.indentPattern,
    minify:
      typeof options.minify === 'boolean' ? options.minify : config.minify,
    preserveComments:
      typeof options.preserveComments === 'boolean'
        ? options.preserveComments
        : config.preserveComments
  };
  return config;
}

function sanitizeOptions(options: Options): Options {
  return Object.entries(options).reduce(
    (options: { [key: string]: Option }, [key, option]: [string, Option]) => {
      if (
        key.length &&
        key[0] !== '_' &&
        key !== 'Command' &&
        key !== 'Option' &&
        key !== 'args' &&
        key !== 'commands' &&
        key !== 'options' &&
        key !== 'rawArgs'
      ) {
        options[key] = option;
      }
      return options;
    },
    {}
  );
}
