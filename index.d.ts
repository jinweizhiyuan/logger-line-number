export enum LOG_TYPES {
  NONE,
  ERROR,
  NORMAL,
  DEBUG
}

export function setLogType(type:LOG_TYPES): void;

export function log(...msg:any[]): void;

export function error(...msg:any[]): void;

export function debug(...msg:any[]): void
