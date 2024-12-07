import { Command } from 'commander';
import ora from 'ora';
import action from './action';
import handleError from './handleError';
import { Options, Dependancies } from './types';
import { createConfig } from './config';

const dependancies: Dependancies = { spinner: ora() };
const program = new Command();

try {
  program
    .option('--config [json]', 'config json')
    .option('--css-files [glob]', 'css files glob')
    .option('--json-files [glob]', 'json files glob')
    .option('--sql-files [glob]', 'sql files glob')
    .option('--xml-files [glob]', 'xml files glob')
    .option('-i --indent-pattern', 'indent pattern')
    .option('-m --minify', 'minify')
    .option('-p --preserve-comments', 'preserve comments')
    .action(async (options: Options) => {
      try {
        if (typeof options === 'string') {
          options = { indentPattern: options };
        }
        const config = createConfig(options);
        await action(config, dependancies).catch((err: Error) => {
          return handleError(err, dependancies);
        });
        // Don't return anything here
      } catch (err) {
        handleError(err as Error, dependancies);
      }
    });

  program.parse(process.argv);
} catch (err) {
  handleError(err as Error, dependancies);
}
