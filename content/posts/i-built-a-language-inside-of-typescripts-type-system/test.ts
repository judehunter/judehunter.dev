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

// type Atom<T extends string> = T extends `${number}` | string ? T : never;
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

// type Letter = 'a' | 'b' | 'c' | 'd';
// type Word<T> = T extends string ? Letter | `${Word<any>}${Letter}` : any;

type Letter =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';
type Operator = '+' | '-' | '*' | '/' | '(' | ')' | ',' | '=';
type Keyword = 'print' | 'fn' | 'end';

type LexWordLoop<T extends string> =
  T extends `${infer A extends Letter}${infer REST extends string}`
    ? `${A}${LexWordLoop<REST>}`
    : '';
type LexWord<T extends string> = LexWordLoop<T> extends ''
  ? never
  : {type: 'identifier'; val: LexWordLoop<T>};
type LexKeywordOrIdentifier<T extends string> =
  LexWord<T>['val'] extends infer R extends Keyword
    ? {type: R; val: R}
    : LexWord<T>;

type LexNumber2<T extends string> =
  T extends `${infer A extends number}${string}` ? A : '';
type LexNumber<T extends string> = LexNumber2<T> extends ''
  ? never
  : {type: 'number'; val: LexNumber2<T>};

type LexOperator2<T extends string> =
  T extends `${infer A extends Operator}${string}` ? A : '';
type LexOperator<T extends string> = LexOperator2<T> extends ''
  ? never
  : {
      type: LexOperator2<T>;
      val: LexOperator2<T>;
    };

type LexWhitespace<T extends string> =
  T extends `${infer A extends ' '}${infer REST extends string}`
    ? `${A}${LexWhitespace<REST>}`
    : '';

type LexCurrent<T extends string> =
  T extends `${infer R extends LexKeywordOrIdentifier<T>['val']}${string}`
    ? [
        LexKeywordOrIdentifier<T>,
        ...(T extends `${R}${infer REST}` ? LexCurrent<REST> : never),
      ]
    : T extends `${infer R extends LexOperator<T>['val']}${string}`
    ? [
        LexOperator<T>,
        ...(T extends `${R}${infer REST}` ? LexCurrent<REST> : never),
      ]
    : T extends `${infer R extends LexNumber<T>['val']}${string}`
    ? [
        LexNumber<T>,
        ...(T extends `${R}${infer REST}` ? LexCurrent<REST> : never),
      ]
    : T extends `${infer R extends LexWhitespace<T>}${string}`
    ? [...(T extends `${R}${infer REST}` ? LexCurrent<REST> : never)]
    : [];

// type Signature<T> = {[A in keyof T]: {[K in keyof T[A]]: T[A][K]}};

type Signature<T> = T extends Record<any, any>
  ? {[K in keyof T]: Signature<T[K]>}
  : T;
// type Test = Signature<LexCurrent<`fn abc (x, y) x + y end`>>;

type LexLine<T extends string> = LexCurrent<T>;
type Lex<T extends string> = SplitLines<
  Trim<T>
> extends infer R extends string[]
  ? {[K in keyof R]: LexLine<R[K]>}
  : never;

// type Test = Signature<Lex<`fn abc (x, y) x + y end`>>;
type Token = {type: any; val: any};
type ParseAtom<T extends Token[]> = T[0] extends {
  type: 'identifier' | 'number';
}
  ? Signature<T[0] & {tokens: 1}>
  : never;

type Tail<T extends any[]> = T extends [any, ...infer U] ? U : never;
type TailN<T extends any[], N extends number> = N extends 0
  ? T
  : TailN<Tail<T>, Subtract<N, 1>>;

// type Q = Signature<TailN<['a', 'b', 'c'], 4>>;
// type TailN<T extends any[], N extends number> =

type Length<T extends any[]> = T extends {length: infer L} ? L : never;
type BuildTuple<L extends number, T extends any[] = []> = T extends {length: L}
  ? T
  : BuildTuple<L, [...T, any]>;
type Add<A extends number, B extends number> = Length<
  [...BuildTuple<A>, ...BuildTuple<B>]
>;
type Subtract<A extends number, B extends number> = BuildTuple<A> extends [
  ...infer U,
  ...BuildTuple<B>,
]
  ? Length<U>
  : never;

type MultiAdd<
  N extends number,
  A extends number,
  I extends number,
> = I extends 0 ? A : MultiAdd<N, Add<N, A>, Subtract<I, 1>>;

type EQ<A, B> = A extends B ? (B extends A ? true : false) : false;
type AtTerminus<A extends number, B extends number> = A extends 0
  ? true
  : B extends 0
  ? true
  : false;
type LT<A extends number, B extends number> = AtTerminus<A, B> extends true
  ? EQ<A, B> extends true
    ? false
    : A extends 0
    ? true
    : false
  : LT<Subtract<A, 1>, Subtract<B, 1>>;

type MultiSub<N extends number, D extends number, Q extends number> = LT<
  N,
  D
> extends true
  ? Q
  : MultiSub<Subtract<N, D>, D, Add<Q, 1>>;

type Multiply<A extends number, B extends number> = MultiAdd<A, 0, B>;
type Divide<A extends number, B extends number> = MultiSub<A, B, 0>;

// type TailToken<T extends Token[]> = T extends [any, ...infer U extends Token[]]
//   ? U
//   : never;
// type TailNToken<T extends Token[], N extends number> = N extends 0
//   ? T
//   : TailN<Tail<T>, Subtract<N, 1>> extends infer R extends Token[]
//   ? R
//   : never;

type Atom<INPUT extends Token[], CUR extends number> = [
  Add<CUR, 1>,
  INPUT[CUR],
];

type MulDivLoop<
  INPUT extends Token[],
  CUR extends number,
  EXPR extends any,
> = INPUT[CUR]['type'] extends '*' | '/'
  ? Atom<INPUT, Add<CUR, 1>> extends infer B extends [number, any]
    ? MulDivLoop<
        INPUT,
        B[0],
        {
          type: 'binary';
          op: INPUT[CUR]['type'];
          left: EXPR;
          right: B[1];
        }
      >
    : never
  : [CUR, EXPR];

type MulDiv<INPUT extends Token[], CUR extends number> = Atom<
  INPUT,
  CUR
> extends infer A extends [number, any]
  ? MulDivLoop<INPUT, A[0], A[1]>
  : never;

type AddSubLoop<
  INPUT extends Token[],
  CUR extends number,
  EXPR extends any,
> = INPUT[CUR]['type'] extends '+' | '-'
  ? MulDiv<INPUT, Add<CUR, 1>> extends infer B extends [number, any]
    ? AddSubLoop<
        INPUT,
        B[0],
        {
          type: 'binary';
          op: INPUT[CUR]['type'];
          left: EXPR;
          right: B[1];
        }
      >
    : never
  : [CUR, EXPR];

type AddSub<INPUT extends Token[], CUR extends number> = MulDiv<
  INPUT,
  CUR
> extends infer A extends [number, any]
  ? AddSubLoop<INPUT, A[0], A[1]>
  : never;

type Expr<INPUT extends Token[], CUR extends number> = AddSub<
  INPUT,
  CUR
> extends infer R extends [number, any] // had to add this for optimalization for some reason
  ? R[1]
  : never;
type ExprStmt<INPUT extends Token[]> = Expr<INPUT, 0>;

type PrintStmt<INPUT extends Token[]> = {type: 'print'; expr: Expr<INPUT, 1>};
type Stmt<INPUT extends Token[]> = INPUT[0] extends {
  type: 'print';
}
  ? PrintStmt<INPUT>
  : ExprStmt<INPUT>;

type ABC = Stmt<Lex<'print a + b'>[0]>;

/*
def atom(input, cur):
  x = input[cur]
  cur +=1
  return x, cur

def mulLoop(input, cur, expr):
  if cur < len(input) and (input[cur] == '*' or input[cur] == '/'):
    op = input[cur]
    cur += 1
    right, cur = atom(input, cur)
    return mulLoop(input, cur, {"left": expr, "op": op, "right": right})
  return expr, cur

def mul(input, cur):
  expr, cur = atom(input, cur)

  expr, cur = mulLoop(input, cur, expr)
  
  return expr, cur

def addLoop(input, cur, expr):
  if cur < len(input) and (input[cur] == '+' or input[cur] == '-'):
    op = input[cur]
    cur += 1
    right, cur = mul(input, cur)
    return addLoop(input, cur, {"left": expr, "op": op, "right": right})
  return expr, cur
    

def add(input, cur):
  expr, cur = mul(input, cur)

  expr, cur = addLoop(input, cur, expr)
  
  return expr, cur

print(add(['a', '-', 'b', '*', 'c'], 0))
*/

/*
type MulDivLoop<
  T extends string,
  EXPR,
> = T extends `* ${infer B extends string}`
  ? B extends `${infer A extends string} * ${infer REST extends string}`
    ? AddSubLoop<`* ${REST}`, AddSubLoop<B, {op: '*'; left: EXPR; right: A}>>
    : AddSubLoop<
        B,
        AddSubLoop<
          B,
          {
            op: '*';
            left: EXPR;
            right: Atom<T> extends `* ${infer REST2 extends string}`
              ? REST2
              : never;
          }
        >
      >
  : EXPR;

type MulDiv<T extends string> =
  T extends `${infer A extends string} ${infer REST extends string}`
    ? MulDivLoop<`${REST}`, Atom<A>>
    : Atom<T>;

type AddSubLoop<T extends string, EXPR> = T extends `${infer OP extends
  | '+'
  | '-'} ${infer B extends string}`
  ? B extends `${infer A extends string} + ${infer REST extends string}`
    ? AddSubLoop<
        `+ ${REST}`,
        AddSubLoop<B, {op: '+'; left: EXPR; right: MulDiv<A>}>
      >
    : AddSubLoop<
        B,
        AddSubLoop<
          B,
          {
            op: '+';
            left: EXPR;
            right: T extends `${OP} ${infer REST2 extends string}`
              ? MulDiv<REST2>
              : never;
          }
        >
      >
  : EXPR;

type AddSub<T extends string> =
  T extends `${infer A extends string} ${infer REST extends string}`
    ? AddSubLoop<`${REST}`, MulDiv<A>>
    : MulDiv<T>;
*/
// type Test = AddSub<'aa + bb * cc + dd'>;
//   ^?

// type TrimArray<T extends string[]> = { [K in keyof T]: Trim<T[K]> };

// type Lex<T extends string> = SplitLines<Trim<T>>;

type Parse<T extends string> = Lex<T>;

type Eval<T extends string> = Parse<T>;

// type Evaled =
//   // ^?
//   Eval<`
//     a = 5
//     print a
//   `>;

export const Stupid = () => {};
