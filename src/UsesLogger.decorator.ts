import CustomLogger from './Logger';

export const UsesLogger = (serviceName?: string) => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    if (
      Reflect.hasOwnMetadata('custom-logger-param-index', target, propertyKey)
    ) {
      const paramIndex = Reflect.getMetadata(
        'custom-logger-param-index',
        target,
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
};
