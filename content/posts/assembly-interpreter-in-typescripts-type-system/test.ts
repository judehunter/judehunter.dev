type FirstCharacter<T> = T extends `${infer R}${string}` ? R : never;

type TestFirstCharacter = FirstCharacter<'abcdef'>; // 'a'

type LastCharacter<T> = T extends `${string}${infer Rest}`
  ? Rest extends ''
    ? T
    : LastCharacter<Rest>
  : never;

type TestLastCharacter = LastCharacter<'abcdef'>;

type Tail<T> = T extends `${string}${infer R}`
  ? R extends ''
    ? never
    : R
  : never;

type FindPredicate<T, PC> = T extends {idx: PC} ? T : never;

type Find<Instrs, PC> = {
  [K in keyof Instrs as K extends number ? K : never]: FindPredicate<
    Instrs[K],
    PC
  >;
}[any];

type Clean<Arr> = {
  [K in keyof Arr as K extends number ? K : never]: Arr[K];
}[any];

type CleanFind<Instrs, PC> = Clean<Find<Instrs, PC>>;

type Test = Find<[{idx: '0'; a: 'a'}, {idx: '1'; b: 'b'}], '1'>;

export {};
