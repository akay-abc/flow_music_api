import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import * as dayjs from 'dayjs';
import path from 'path';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeOrmExceptionFilter<T extends TypeORMError> implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const message = exception.message;
    response.status(200).json({
      code: 500,
      message,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      path: request.url,
    })
  }
}
