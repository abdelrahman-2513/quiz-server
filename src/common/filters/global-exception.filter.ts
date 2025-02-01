import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    
    const message = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';
    
    console.log(message["message"])
    response.status(status).json({
      statusCode: status,
      messages: message["message"] || [message],
      timestamp: new Date().toISOString(),
    });
  }
}
