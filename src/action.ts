import { Config, Dependancies } from './types';

export default async function action(
  config: Config,
  dependancies: Dependancies
) {
  const { spinner } = dependancies;
  spinner.succeed('yay');
  return config;
}
