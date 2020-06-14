import { VariadicCurry } from './types';

export * from './types';

type GenericFn = (...args: any[]) => any;

export function curry<T extends any[], R>(
  fn: (...args: T) => R,
  arity?: number
): VariadicCurry<T, R>;

export function curry(fn: GenericFn, arity: number = fn.length) {
  return function curried(...args: any[]): any {
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

export function curryRight(fn: GenericFn, arity: number = fn.length) {
  return function curried(...args: any[]): any {
    if (args.length >= arity) {
      return fn(...args.slice(0, arity).reverse());
    }

    return (...newArgs: any[]) => curried(...args, ...newArgs);
  };
}
