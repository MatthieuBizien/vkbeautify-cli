import cosmiconfig from 'cosmiconfig';
import mergeConfiguration from 'merge-configuration';
import pkgDir from 'pkg-dir';
import { environment } from 'js-info';
import { oc } from 'ts-optchain.macro';
import defaultConfig from './defaultConfig';
import { Config, Option, Options } from '../types';

export default function createConfig(
  options: Options = {},
  customConfig: Partial<Config> = {}
): Config {
  const rootPath = pkgDir.sync(process.cwd()) || process.cwd();
  options = sanitizeOptions(options);
  if (!options) console.log(options);
  const userConfig: Partial<Config> = oc(
    cosmiconfig('vkbeautify').searchSync(rootPath)
  ).config({});
  let config = mergeConfiguration(defaultConfig, userConfig);
  config = mergeConfiguration(config, customConfig);
  config = {
    ...config,
    env: environment.value
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
