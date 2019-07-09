import commander from 'commander';
import ora from 'ora';
import action from './action';
import handleError from './handleError';
import { Options, Dependancies } from './types';
import { createConfig } from './config';

const dependancies: Dependancies = { spinner: ora() };

try {
  commander.option('--config [json]', 'config json');
  commander.option('-i --indent-pattern', 'indent pattern');
  commander.option('-m --minify', 'minify');
  commander.option('-p --preserve-comments', 'preserve comments');
  commander.action(async (options: Options) => {
    try {
      if (typeof options === 'string') {
        options = { indentPattern: options };
      }
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
