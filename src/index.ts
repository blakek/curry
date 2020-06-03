export function curry(fn: Function, arity: number = fn.length): any {
  return function curried(...args: any[]) {
    if (args.length >= arity) {
      return fn(...args.slice(0, arity));
    }

    return (...newArgs: any[]) => curried(...args, ...newArgs);
  };
}

export function curryRight(fn: Function, arity: number = fn.length): any {
  return function curried(...args: any[]) {
    if (args.length >= arity) {
      return fn(...args.slice(0, arity).reverse());
    }

    return (...newArgs: any[]) => curried(...args, ...newArgs);
  };
}

export default curry;
