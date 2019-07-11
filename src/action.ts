import fs from 'fs-extra';
import globCbf from 'glob';
import vkbeautify from 'vkbeautify';
import { Config, Dependancies } from './types';

export default async function action(
  config: Config,
  dependancies: Dependancies
) {
  await format('css', await glob(config.cssFiles), config, dependancies);
  await format('json', await glob(config.jsonFiles), config, dependancies);
  await format('sql', await glob(config.sqlFiles), config, dependancies);
  await format('xml', await glob(config.xmlFiles), config, dependancies);
  return config;
}

async function format(
  fileType: string,
  filePaths: string[],
  config: Config,
  dependancies: Dependancies
) {
  return Promise.all(
    filePaths.map(filePath => {
      return formatFile(fileType, filePath, config, dependancies);
    })
  );
}

async function formatFile(
  fileType: string,
  filePath: string,
  config: Config,
  dependancies: Dependancies
) {
  const { spinner } = dependancies;
  const file = (await fs.readFile(filePath)).toString();
  let updatedFile = file;
  switch (fileType) {
    case 'xml':
      if (config.minify) {
        updatedFile = vkbeautify.xmlmin(file, config.preserveComments);
      } else {
        updatedFile = vkbeautify.xml(file, config.indentPattern);
      }
      break;
    case 'json':
      if (config.minify) {
        updatedFile = vkbeautify.jsonmin(file, config.preserveComments);
      } else {
        updatedFile = vkbeautify.json(file, config.indentPattern);
      }
      break;
    case 'css':
      if (config.minify) {
        updatedFile = vkbeautify.cssmin(file, config.preserveComments);
      } else {
        updatedFile = vkbeautify.css(file, config.indentPattern);
      }
      break;
    case 'sql':
      if (config.minify) {
        updatedFile = vkbeautify.sqlmin(file, config.preserveComments);
      } else {
        updatedFile = vkbeautify.sql(file, config.indentPattern);
      }
      break;
  }
  spinner.info(filePath);
  return fs.writeFile(filePath, updatedFile);
}

async function glob(pattern: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    return globCbf(pattern, (err: Error | null, matches: string[]) => {
      if (err) return reject(err);
      return resolve(matches);
    });
  });
}
