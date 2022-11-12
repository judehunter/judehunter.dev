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

export {};
