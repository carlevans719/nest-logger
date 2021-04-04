import CustomLogger from './Logger';

export const UsesLogger = (serviceName?: string) => (target: any) => {
  const propertyKeys = Object.getOwnPropertyNames(target.prototype);
  for (const propertyKey of propertyKeys) {
    if (
      typeof target.prototype[propertyKey] === 'function' &&
      propertyKey !== 'constructor'
    ) {
      const originalMethod = target.prototype[propertyKey];

      target.prototype[propertyKey] = function (...args: any[]) {
        if (
          Reflect.hasOwnMetadata(
            'custom-logger-param-index',
            target.prototype,
            propertyKey,
          )
        ) {
          const paramIndex = Reflect.getMetadata(
            'custom-logger-param-index',
            target.prototype,
            propertyKey,
          );

          args[paramIndex] = new CustomLogger(
            target.name,
            propertyKey,
            serviceName || '',
          );
        }

        return originalMethod.apply(this, args);
      };
    }
  }
};
