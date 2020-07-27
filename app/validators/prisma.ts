/**
 * NEED TO APPLY THIS FN TO ALL REQUEST WHO USE `findMany`
 * TODO: Check `take` argument when it's used with include
 * @param takeArg
 */
export function checkTakeArg(takeArg: number) {
  if (takeArg > 20) {
    throw Error("WOW TOO MUCH ENTITIES REQUESTED")
  }
}
