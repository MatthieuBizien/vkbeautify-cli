import commander from 'commander';
import ora from 'ora';
import action from './action';
import handleError from './handleError';
import { Options, Dependancies } from './types';
import { createConfig } from './config';

const dependancies: Dependancies = { spinner: ora() };

try {
  commander.option('--config [json]', 'config json');
  commander.option('--docs-path [path]', 'docs path');
  commander.option('--output-path [path]', 'output path');
  commander.option('-p --port [port]', 'server port');
  commander.option('--open', 'open browser');
  commander.option('--readme', 'use readme');
  commander.option('-d --debug', 'debug logging');
  commander.option('-s --serve', 'run server');
  commander.option('-v --verbose', 'verbose logging');
  commander.action(async (options: Options) => {
    try {
      const config = createConfig(options);
      return action(config, dependancies).catch((err: Error) => {
        return handleError(err, dependancies);
      });
    } catch (err) {
      return handleError(err, dependancies);
    }
  });
  commander.parse(process.argv);
} catch (err) {
  handleError(err, dependancies);
}
