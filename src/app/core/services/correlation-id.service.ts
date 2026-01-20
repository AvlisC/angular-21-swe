import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RequestContextCorrelationId {
  private _correlationId = signal<string | null>(null);

  correlationId = this._correlationId.asReadonly();

  createCorrelationId(): string {
    const id = crypto.randomUUID();
    this._correlationId.set(id);
    return id;
  }

  clear() {
    this._correlationId.set(null);
  }
}
