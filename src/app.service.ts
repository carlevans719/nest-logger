import { Injectable } from '@nestjs/common';
import CustomLogger from './Logger';
import { Logger } from './Logger.decorator';
import { UsesLogger } from './UsesLogger.decorator';

@Injectable()
export class AppService {
  @UsesLogger('ServiceName')
  getHello(@Logger logger?: CustomLogger): string {
    logger.log('FooBar, Baz');
    return 'Hello World!';
  }
}
