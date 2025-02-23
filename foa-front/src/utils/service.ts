//file to export toSnakeKeys and camelizeKeys

import { camelCase, snakeCase } from 'lodash';

export function toSnakeKeys(
  obj: Record<string, unknown> | Array<Record<string, unknown>>,
): unknown {
  if (Array.isArray(obj)) {
    return obj.map((v) => toSnakeKeys(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [snakeCase(key)]: toSnakeKeys(obj[key] as Record<string, unknown>),
      }),
      {},
    );
  }
  return obj;
}

export function camelizeKeys(obj: Record<string, unknown>): unknown {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key] as Record<string, unknown>),
      }),
      {},
    );
  }
  return obj;
}