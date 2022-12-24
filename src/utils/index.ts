// 判断值是否为某个类型
export const is = (val: unknown, type: string): boolean =>
  Object.prototype.toString.call(val) === `[object ${type}]`

// 判断值是否为字符串
export const isString = (val: unknown): boolean => typeof val === 'string'
