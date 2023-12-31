import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException , host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errMsg = exception.message;

    response
      .status(status)
      .json({
        errMsg,
        timestamp: `${dayjs().valueOf()}`,
        path: request.url,
        method: request.method,
      });
  }
}
