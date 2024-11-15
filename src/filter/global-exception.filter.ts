import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Catch(HttpException)
export class GlobalExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const message = exception.message;
    // console.log("GlobalExceptionFilter: "+exception.message);
    response.status(200).json({
      success: false,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      message,
      code: status,
      path: request.url
    })
  }
}

