export type ValueOf<T> = T[keyof T];

/**
 * Allow `string` fallbacks without breaking autocomplete
 */
export type String = string & {};
/**
 * Allow `number` fallbacks without breaking autocomplete
 */
export type Number = number & {};

export type StringNumber = string | number;
export type StringNumberArr = StringNumber | StringNumber[];
