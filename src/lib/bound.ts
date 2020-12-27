/**
 * A method decorator which defines a method bound to its class instance.
 * This means that this method becomes an instance member for each instance
 * and always has that instance as 'this' context.
 * Can't be overridden with call/apply/bind.
 * May be used directly as a decorator:
 *  @bound myMethod()
 * Or with parameter, which is considered a function transformation callback
 *  that accepts an original class method and returns a method to replace it.
 *  This returned method is then bound to the class instance.
 */
export function bound(handle: (method: Function) => Function): MethodDecorator;
export function bound(
  methodClass: any,
  methodName: string,
  methodDescriptor: PropertyDescriptor
): any;
export function bound(
  methodClass: any,
  methodName?: string,
  methodDescriptor?: PropertyDescriptor,
  handle?: (method: Function) => Function
): any {
  if (!methodName) {
    const passedHandle = methodClass;
    return function(
      mClass: any,
      mName?: string,
      mDescriptor?: PropertyDescriptor
    ) {
      return (bound as any)(mClass, mName, mDescriptor, passedHandle);
    };
  } else {
    const originalMethod = methodDescriptor.value;
    const classPrototype = methodClass.prototype;

    let isDefining = false;

    if (typeof originalMethod !== "function") {
      throw new Error("@bound is only applicable to methods");
    }

    return {
      configurable: true,
      get() {
        if (
          isDefining ||
          this === classPrototype ||
          this.hasOwnProperty(methodName)
        ) {
          return originalMethod;
        }

        isDefining = true;

        const boundInstance = this;
        const boundMethod = bound.make(originalMethod, boundInstance, handle);

        Object.defineProperty(boundInstance, methodName, {
          value: boundMethod,
          configurable: true,
          writable: true
        });

        isDefining = false;
        return boundMethod;
      }
    };
  }
}

export namespace bound {
  const Context = Symbol();

  /** A method bound to instance with "bound" decorator */
  export interface Method {
    (...args: any[]): any;
    [Context]: any;
  }

  /** Function transformation callback */
  export type Wrapper = (method: Function) => Function;

  /** Determines if given argument is bound method */
  export function is(something: any): something is Method {
    return typeof something === "function" && (something as any)[Context];
  }

  /** Creates function bound to given context from original function and
   * options function transformation. Transform is applied to a bound function,
   * and the function returned by transform is automatically bound, so there is
   * no need to bind to context inside transform.
   */
  export function make(
    method: Function,
    context: any,
    handle?: Wrapper
  ): Method {
    let contextBinding = ((...args: any[]) => {
      return method.apply(context, args);
    }) as Method;

    if (handle) {
      const handled = handle(contextBinding) as Method;
      const handledBinding = ((...args: any[]) => {
        return handled.apply(context, args);
      }) as Method;
      handledBinding[Context] = context;
      return handledBinding;
    } else {
      contextBinding[Context] = context;
      return contextBinding;
    }
  }

  /**
   * Returns context of given function if it is a bound method and
   * null otherwise.
   */
  export function getContext(something: any): any {
    return is(something) ? something[Context] : null;
  }

  /**
   * Deletes stored context field for given function
   */
  export function forgetContext(something: Method) {
    something[Context] = null;
  }
}