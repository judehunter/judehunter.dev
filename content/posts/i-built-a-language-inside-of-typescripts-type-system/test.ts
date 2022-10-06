type TrimLeft2<T extends string> = T extends ` ${infer R extends string}`
  ? TrimLeft2<R>
  : T;

/*

a = 5
b = 7
a + b * a + b
print a

*/

type WhiteSpace = ' ' | '\n';

type TrimLeft<T extends string> =
  T extends `${WhiteSpace}${infer R extends string}` ? TrimLeft<R> : T;
type TrimRight<T extends string> =
  T extends `${infer R extends string}${WhiteSpace}` ? TrimRight<R> : T;
type Trim<T extends string> = TrimRight<TrimLeft<T>>;

type Split<
  T extends string,
  SEP extends string,
> = T extends `${infer LINE extends string}${SEP}${infer REST extends string}`
  ? [LINE, ...Split<REST, SEP>]
  : [T];

type SplitLines<T extends string> = Split<T, '\n'>;

type Maybe<T extends string> = T | '';

type Atom<T extends string> = T extends `${number}` | string ? T : never;
// type Mul<T extends string> = T extends `${infer A extends string}*${infer REST extends string}` ? {left: Mul<A>, right: AddSub<REST>, op: '*'} : Atom<T>;
// type MulDiv<
//   T extends string,
//   EPXR = null,
//   OP2 = null,
// > = T extends `${infer A extends string}${infer OP extends
//   | '*'
//   | '/'}${infer REST extends string}`
//   ? MulDiv<
//       REST,
//       EPXR extends null ? Atom<A> : {left: EPXR; right: Atom<A>; op: OP2},
//       OP
//     >
//   : {left: EPXR; right: Atom<T>; op: OP2};
// type AddSub<
//   T extends string,
//   EPXR = null,
//   OP2 = null,
// > = T extends `${infer A extends string}${infer OP extends
//   | '+'
//   | '-'}${infer REST extends string}`
//   ? AddSub<
//       REST,
//       EPXR extends null ? MulDiv<A> : {left: EPXR; right: MulDiv<A>; op: OP2},
//       OP
//     >
//   : {left: EPXR; right: MulDiv<T>; op: OP2};
// type MulDiv<T extends string> =
//   Reverse<T> extends `${infer A extends string}${infer OP extends
//     | '+'
//     | '-'}${infer REST extends string}`
//     ? any
//     : any;
// type AddSub<T extends string> =
//   Reverse<T> extends `${infer A extends string}${infer OP extends
//     | '+'
//     | '-'}${infer REST extends string}`
//     ? any
//     : any;
// type Reverse<T extends string> = T extends `${infer A}${infer B}`
//   ? `${Reverse<B>}${A}`
//   : T;
// type X = Reverse<'abcdef'>;

type MulDiv<T extends string, EXPR> = T extends `*${infer B extends string}`
  ? B extends `${infer A extends string}*${infer REST extends string}`
    ? AddSub<`*${REST}`, AddSub<B, {op: '*'; left: EXPR; right: A}>>
    : AddSub<
        B,
        AddSub<
          B,
          {
            op: '*';
            left: EXPR;
            right: Atom<T> extends `*${infer REST2 extends string}`
              ? REST2
              : never;
          }
        >
      >
  : EXPR;

type InitMulDiv<T extends string> =
  T extends `${infer A extends string}*${infer REST extends string}`
    ? AddSub<`*${REST}`, Atom<A>>
    : never;

type AddSub<T extends string, EXPR> = T extends `+${infer B extends string}`
  ? B extends `${infer A extends string}+${infer REST extends string}`
    ? AddSub<`+${REST}`, AddSub<B, {op: '+'; left: EXPR; right: A}>>
    : AddSub<
        B,
        AddSub<
          B,
          {
            op: '+';
            left: EXPR;
            right: T extends `+${infer REST2 extends string}` ? REST2 : never;
          }
        >
      >
  : EXPR;

type InitAddSub<T extends string> =
  T extends `${infer A extends string}+${infer REST extends string}`
    ? AddSub<`+${REST}`, Atom<A>>
    : never;

type Test = InitAddSub<'ax+byz+cad+dyb'>;
//   ^?

// type TrimArray<T extends string[]> = { [K in keyof T]: Trim<T[K]> };

type Lex<T extends string> = SplitLines<Trim<T>>;

type Parse<T extends string> = Lex<T>;

type Eval<T extends string> = Parse<T>;

type Evaled =
  // ^?
  Eval<`
    a = 5
    print a
  `>;

export const Stupid = () => {};
