type messageType = 'debug' | 'info' | 'error' | 'warn';

export interface ILogger {
  debug: (message: string, ...data: any[]) => void;
  info: (message: string, ...data: any[]) => void;
  error: (message: string, ...data: any[]) => void;
  warning: (message: string, ...data: any[]) => void;
}

export default class Logger implements ILogger {
  public debug(message: string, ...data: any[]): void {
    this.emitLogMessage('debug', message, data);
  }
  public info(message: string, ...data: any[]): void {
    this.emitLogMessage('info', message, data);
  }
  public error(message: string, ...data: any[]): void {
    this.emitLogMessage('error', message, data);
  }
  public warning(message: string, ...data: any[]): void {
    this.emitLogMessage('warn', message, data);
  }
  private emitLogMessage(type: messageType, message: string, data: any[]) {
    if (data.length === 0) {
      console[type](message);
    } else {
      console[type](message, data);
    }
  }
}