declare class Vkbeautify {
  static css(text: string, indentPattern: number | string): string;
  static cssmin(text: string, preserveComments: boolean): string;
  static json(text: string, indentPattern: number | string): string;
  static jsonmin(text: string, preserveComments: boolean): string;
  static sql(text: string, indentPattern: number | string): string;
  static sqlmin(text: string, preserveComments: boolean): string;
  static xml(text: string, indentPattern: number | string): string;
  static xmlmin(text: string, preserveComments: boolean): string;
}

declare module 'vkbeautify' {
  export = Vkbeautify;
}
