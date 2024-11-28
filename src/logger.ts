import { appendFileSync } from 'fs';
import { join } from 'path/posix';

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL';

const formatMessage = (level: LogLevel, message: any, meta?: Record<string, any>) => {
  const timestamp = new Date().toISOString();
  const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
  return `${timestamp} [${level.padEnd(5)}] ${JSON.stringify(message)}${metaStr}\n`;
};

const log = (level: LogLevel, message: any, meta?: Record<string, any>) => {
  appendFileSync(
    join(import.meta.dir, '../mcp-server.log'),
    formatMessage(level, message, meta)
  );
};

export const debug = (message: any, meta?: Record<string, any>) => log('DEBUG', message, meta);
export const info = (message: any, meta?: Record<string, any>) => log('INFO', message, meta);
export const warn = (message: any, meta?: Record<string, any>) => log('WARN', message, meta);
export const error = (message: any, meta?: Record<string, any>) => log('ERROR', message, meta);
export const fatal = (message: any, meta?: Record<string, any>) => log('FATAL', message, meta);

export default { debug, info, warn, error, fatal };

// Example usage:
// logger.info('Server started', { port: 3000 });
// logger.error('Database connection failed', { code: 'ECONNREFUSED' });