/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function exhaustiveCheck(parameter: never): never {
  throw new Error("should not reach here");
}
