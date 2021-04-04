import CustomLogger from './Logger';

export const UsesLogger = (serviceName?: string) => (target: any) => {
  const descriptors = Object.getOwnPropertyDescriptors(target.prototype);
  for (const propertyKey in descriptors) {
    if (
      typeof descriptors[propertyKey].value === 'function' &&
      propertyKey !== 'constructor'
    ) {
      const descriptor = descriptors[propertyKey];

      const originalMethod = descriptor.value;

      descriptor.value = function (...args: any[]) {
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
            target.constructor.name,
            propertyKey,
            serviceName || '',
          );
        }

        return originalMethod.apply(this, args);
      };
    }
  }
};
