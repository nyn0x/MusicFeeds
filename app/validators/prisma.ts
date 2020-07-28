import { MAX_ENTITIES_PER_REQUEST, MAX_DEPTH_PER_REQUEST } from "app/utils/constantes"

interface takeArg {
  take: number
  max?: number
}
export function checkMaliciousQuery(takeArg: takeArg, select?: Object) {
  checkTakeArg(takeArg)
  checkMaxDepth(select)
}

/**
 * NEED TO APPLY THIS FN TO ALL REQUEST WHO USE `findMany`
 *
 * TODO: Check `take` argument when it's used with include
 * TODO : Ideally define max entities requestable by query
 *
 * @param takeArg
 */
export function checkTakeArg(takeArg: takeArg) {
  let error = "WOW TOO MUCH ENTITIES REQUESTED"
  const { take, max } = takeArg
  switch (true) {
    case !Number.isInteger(take):
      throw Error("`TAKE` ARG NOT VALID OR MISSING")
    case max && take > max:
      throw Error(error)
    case !max && take > MAX_ENTITIES_PER_REQUEST:
      throw Error(error)
  }
}

/**
 * Each relationship added in select has a coast
 * so this function limit the maximum depth of incoming queries
 *
 * TODO : Ideally define level by query
 *
 * /!\ level of each `select` is count
 * @param object
 */
export function checkMaxDepth(select: Object) {
  if (typeof select === "undefined") {
    return null
  }
  let level = 1
  for (let key in select) {
    if (!select.hasOwnProperty(key)) continue

    if (typeof select[key] === "object") {
      let depth = checkMaxDepth(select[key]) + 1
      level = Math.max(depth, level)
      if (level > MAX_DEPTH_PER_REQUEST) {
        throw Error("WOW DEPTH LIMITING REACHED")
      }
    }
  }

  return level
}
