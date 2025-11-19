/**
 * Logger utility for debugging and monitoring
 *
 * Usage:
 *   logger.info('User logged in', { userId: 123 })
 *   logger.error('API call failed', { error, endpoint })
 *   logger.debug('Processing data', { count: items.length })
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: any;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  private log(level: LogLevel, message: string, context?: LogContext) {
    const formattedMessage = this.formatMessage(level, message, context);

    switch (level) {
      case 'debug':
        if (this.isDevelopment) {
          console.debug(formattedMessage);
        }
        break;
      case 'info':
        console.log(formattedMessage);
        break;
      case 'warn':
        console.warn(formattedMessage);
        break;
      case 'error':
        console.error(formattedMessage);
        break;
    }
  }

  debug(message: string, context?: LogContext) {
    this.log('debug', message, context);
  }

  info(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log('warn', message, context);
  }

  error(message: string, context?: LogContext) {
    this.log('error', message, context);
  }

  /**
   * Measure execution time of a function
   */
  async time<T>(label: string, fn: () => Promise<T>): Promise<T> {
    const startTime = performance.now();
    this.debug(`${label} - started`);

    try {
      const result = await fn();
      const duration = performance.now() - startTime;
      this.info(`${label} - completed`, { durationMs: duration.toFixed(2) });
      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      this.error(`${label} - failed`, { durationMs: duration.toFixed(2), error });
      throw error;
    }
  }
}

export const logger = new Logger();
