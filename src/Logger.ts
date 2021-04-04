import { Logger as NestLogger } from '@nestjs/common';

export default class Logger {
  context: string;

  constructor(className: string, methodName: string, moduleName?: string) {
    if (moduleName) {
      const formattedModuleName =
        moduleName.slice(0, 1).toUpperCase() + moduleName.slice(1);

      this.context = `${formattedModuleName}:${className}.${methodName}`;
    } else {
      this.context = `${className}.${methodName}`;
    }
  }

  trace(msg: string) {
    try {
      NestLogger.verbose(msg, this.context);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.trace(`${this.context}: - ${msg}`);
    }
  }

  debug(msg: string) {
    try {
      NestLogger.debug(msg, this.context);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.debug(`${this.context}: - ${msg}`);
    }
  }

  log(msg: string) {
    try {
      NestLogger.log(msg, this.context);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`${this.context}: - ${msg}`);
    }
  }

  warn(msg: string) {
    try {
      NestLogger.warn(msg, this.context);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`${this.context}: - ${msg}`);
    }
  }

  error(msg: string) {
    try {
      NestLogger.error(msg, this.context);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`${this.context}: - ${msg}`);
    }
  }
}
