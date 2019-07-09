export interface Dependancies {
  spinner: Spinner;
}

export interface Options {
  [key: string]: Option;
}

export interface Config {
  env: string;
}

export type Option = object;

export interface Spinner {
  clear(): Spinner;
  fail(text?: string): Spinner;
  info(text?: string): Spinner;
  start(text?: string): Spinner;
  stop(): Spinner;
  succeed(text?: string): Spinner;
  warn(text?: string): Spinner;
}
