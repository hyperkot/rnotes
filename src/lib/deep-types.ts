
export type primitive = string | number | boolean | undefined | null;
export type primitiveOrFunction = primitive | Function;
export type DeepReadonly<T> =
    T extends primitiveOrFunction ? T :
    T extends Array<infer U> ? DeepReadonlyArray<U> :
    DeepReadonlyObject<T>;

export type DeepPartial<T> = T extends primitiveOrFunction ? T :
    T extends Array<infer U> ? DeepPartialArray<U> :
    DeepPartialObject<T>;

export interface DeepPartialArray<T> extends Array<DeepPartial<T>> { }
export type DeepPartialObject<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> { }

export type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>
};

export interface callable {
    (...args: any[]): any;
}