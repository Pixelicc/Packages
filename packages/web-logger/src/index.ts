const CSS = {
  time: "color: #a0a0a0",
  service: "color: #00e676; font-weight: bold",
  reset: "color: inherit",
  critical:
    "background: #c62828; color: #ffffff; font-weight: bold; padding: 0 3px; border-radius: 2px",
  error: "color: #ef5350; font-weight: bold",
  warning: "color: #ffa726; font-weight: bold",
  info: "color: #42a5f5",
  debug: "color: #26c6da",
  trace: "color: #757575",
} as const;

/**
 * Log Levels supported by the package sorted from least important to most important
 *
 * @enum
 */
export enum LogLevels {
  TRACE = 1,
  DEBUG = 2,
  INFO = 3,
  WARNING = 4,
  ERROR = 5,
  CRITICAL = 6,
}

/**
 * Union of Log Levels supported by the package
 *
 * @type
 */
export type LogLevel = keyof typeof LogLevels;

/**
 * Logger Config used when creating a new Logger Instance
 *
 * @type
 */
export type LoggerConfig<T extends string = string> = {
  /**
   * Minimum Log Level that should be logged to the console using the browser's default console implementation
   *
   * @default "INFO"
   */
  minLevel?: LogLevel;
  /**
   * Services that should be logged to the console using the browser's default console implementation
   *
   * @default undefined
   * @example ["ServiceA", "ServiceB"]
   */
  services?: T[];
};

/**
 * Creates a Web Logger Instance
 *
 * @class
 *
 * @constructor config
 *
 * @returns Logger Instance
 */
export class Logger<T extends string = string> {
  public minLevel: LogLevel = "INFO";
  public services: T[];

  /**
   * @constructor Creates a Web Logger Instance
   */
  constructor(config?: LoggerConfig<T>) {
    if (config?.minLevel) this.minLevel = config.minLevel;
    this.services = (config?.services ?? []) as T[];
  }

  /**
   * @private Checks whether the given Log Level satisfies the set `minLevel` of the constructor
   *
   * @param level Log Level to check against the `minLevel`
   */
  private satisfiesMinLevel(level: LogLevel): boolean {
    return LogLevels[level] >= LogLevels[this.minLevel];
  }

  /**
   * @public Logs a message to the console using the browser's default console implementation
   *
   * @param service Service that emitted the log call
   * @param msg Message to log
   * @param level Log Level
   */
  public log(
    service: T | (string & {}),
    msg: string,
    level: LogLevel,
    id?: string,
  ): void {
    if (!this.satisfiesMinLevel(level)) return;

    const dateStr = `${String(new Date().getHours()).padStart(2, "0")}:${String(new Date().getMinutes()).padStart(2, "0")}:${String(new Date().getSeconds()).padStart(2, "0")}`;
    const prefix = id ? `(${id}) ` : "";
    const fmt = `%c[${dateStr}] %c[${service}] %c[${level}]%c » ${prefix}%c${msg}`;

    switch (level) {
      case "CRITICAL":
        console.error(
          fmt,
          CSS.time,
          CSS.service,
          CSS.critical,
          CSS.reset,
          CSS.critical,
        );
        break;
      case "ERROR":
        console.error(
          fmt,
          CSS.time,
          CSS.service,
          CSS.error,
          CSS.reset,
          CSS.error,
        );
        break;
      case "WARNING":
        console.warn(
          fmt,
          CSS.time,
          CSS.service,
          CSS.warning,
          CSS.reset,
          CSS.warning,
        );
        break;
      case "INFO":
        console.log(fmt, CSS.time, CSS.service, CSS.info, CSS.reset, CSS.info);
        break;
      case "DEBUG":
        console.log(
          fmt,
          CSS.time,
          CSS.service,
          CSS.debug,
          CSS.reset,
          CSS.debug,
        );
        break;
      case "TRACE":
        console.log(
          fmt,
          CSS.time,
          CSS.service,
          CSS.trace,
          CSS.reset,
          CSS.trace,
        );
        break;
    }
  }

  /**
   * @public Logs a message to the console using the browser's default console implementation with the **CRITICAL** Level
   *
   * @param service Service that emitted the log call
   * @param msg Message to log
   */
  public critical(service: T | (string & {}), msg: string, id?: string): void {
    this.log(service, msg, "CRITICAL", id);
  }

  /**
   * @public Logs a message to the console using the browser's default console implementation with the **ERROR** Level
   *
   * @param service Service that emitted the log call
   * @param msg Message to log
   */
  public error(service: T | (string & {}), msg: string, id?: string): void {
    this.log(service, msg, "ERROR", id);
  }

  /**
   * @public Logs a message to the console using the browser's default console implementation with the **WARNING** Level
   *
   * @param service Service that emitted the log call
   * @param msg Message to log
   */
  public warning(service: T | (string & {}), msg: string, id?: string): void {
    this.log(service, msg, "WARNING", id);
  }

  /**
   * @public Logs a message to the console using the browser's default console implementation with the **INFO** Level
   *
   * @param service Service that emitted the log call
   * @param msg Message to log
   */
  public info(service: T | (string & {}), msg: string, id?: string): void {
    this.log(service, msg, "INFO", id);
  }

  /**
   * @public Logs a message to the console using the browser's default console implementation with the **DEBUG** Level
   *
   * @param service Service that emitted the log call
   * @param msg Message to log
   */
  public debug(service: T | (string & {}), msg: string, id?: string): void {
    this.log(service, msg, "DEBUG", id);
  }

  /**
   * @public Logs a message to the console using the browser's default console implementation with the **TRACE** Level
   *
   * @param service Service that emitted the log call
   * @param msg Message to log
   */
  public trace(service: T | (string & {}), msg: string, id?: string): void {
    this.log(service, msg, "TRACE", id);
  }
}
