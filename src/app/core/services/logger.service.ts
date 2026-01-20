import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { RequestContextCorrelationId } from './correlation-id.service';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private context = inject(RequestContextCorrelationId);

  info(message: string, data?: unknown) {
    this.log('INFO', message, data);
  }

  error(message: string, error?: unknown) {
    this.log('ERROR', message, error);
  }

  private log(level: string, message: string, data?: unknown) {
    const correlationId = this.context.correlationId();

    console[level === 'ERROR' ? 'error' : 'log']('Information log:', {
      level,
      message,
      correlationId,
      data,
      timestamp: new Date().toISOString()
    });
  }
}
