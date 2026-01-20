import { ErrorHandler, inject, Injectable } from '@angular/core';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private logger = inject(LoggerService);

  handleError(error: unknown) {
    this.logger.error('Erro não tratado', error);
  }
}
