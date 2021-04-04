export const Logger = (target: any, key: string, index: number): any => {
  Reflect.defineMetadata('custom-logger-param-index', index, target, key);
};
