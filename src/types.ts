export interface Dependancies {
  spinner: Spinner;
}

export interface Options {
  cssFiles?: string;
  indentPattern?: string;
  jsonFiles?: string;
  minify?: boolean;
  preserveComments?: boolean;
  sqlFiles?: string;
  xmlFiles?: string;
}

export interface Config {
  cssFiles: string;
  indentPattern: number | string;
  jsonFiles: string;
  minify: boolean;
  preserveComments: boolean;
  sqlFiles: string;
  xmlFiles: string;
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
