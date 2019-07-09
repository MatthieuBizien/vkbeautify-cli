export interface Dependancies {
  spinner: Spinner;
}

export interface Options {
  indentPattern?: string;
  minify?: boolean;
  preserveComments?: boolean;
}

export interface Config {
  indentPattern: number | string;
  minify: boolean;
  preserveComments: boolean;
}

export type Option = string | boolean;

export interface Spinner {
  clear(): Spinner;
  fail(text?: string): Spinner;
  info(text?: string): Spinner;
  start(text?: string): Spinner;
  stop(): Spinner;
  succeed(text?: string): Spinner;
  warn(text?: string): Spinner;
}
