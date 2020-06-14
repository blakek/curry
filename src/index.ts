import { Curry1, Curry2, Curry3, Curry4, Curry5, VariadicCurry } from './types';

export { Curry1, Curry2, Curry3, Curry4, Curry5, VariadicCurry };

export function curry<T extends any[], R>(
  fn: (...args: T) => R,
  arity?: number
): VariadicCurry<T, R>;

export function curry(fn: Function, arity: number = fn.length) {
  return function curried(...args: any[]) {
    if (args.length >= arity) {
      return fn(...args.slice(0, arity));
    }

    return (...newArgs: any[]) => curried(...args, ...newArgs);
  };
}

export function curryRight<T extends any[], R>(
  fn: (...args: T) => R,
  arity?: number
): VariadicCurry<T, R>;

export function curryRight(fn: Function, arity: number = fn.length) {
  return function curried(...args: any[]) {
    if (args.length >= arity) {
      return fn(...args.slice(0, arity).reverse());
    }

    return (...newArgs: any[]) => curried(...args, ...newArgs);
  };
}
