const ANSI = {
  reset: "\x1b[0m",
  gray: "\x1b[90m",
  white: "\x1b[37m",
  greenBright: "\x1b[92m",
  red: "\x1b[31m",
  bgRed: "\x1b[41m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
} as const;

/**
 * Log Levels supported by the package sorted from last important to most important
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
export type LoggerConfig = {
  /**
   * Minimum Log Level that should be logged to the console using the runtime's default console implementation
   *
   * @default "INFO"
   */
  minLevel?: LogLevel;
};

/**
 * Creates a Logger Instance
 *
 * @class
 *
 * @constructor config
 *
 * @returns Logger Instance
 */
export class Logger {
  private minLevel: LogLevel = "INFO";

  /**
   * @constructor Creates a Logger Instance
   */
  constructor(config?: LoggerConfig) {
    if (config?.minLevel) this.minLevel = config.minLevel;
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
   * @public Logs a message to the console using the runtime's default console implementation
   *
   * @param service Service that emitted the log call
   * @param msg Message to log
   * @param level Log Level
   */
  public log(service: string, msg: string, level: LogLevel, id?: string): void {
    if (!this.satisfiesMinLevel(level)) return;

    const dateStr = `${String(new Date().getHours()).padStart(2, "0")}:${String(new Date().getMinutes()).padStart(2, "0")}:${String(new Date().getSeconds()).padStart(2, "0")}`;
    const formattedDate = `${ANSI.white}${dateStr}${ANSI.reset}`;
    const greenService = `${ANSI.greenBright}${service}${ANSI.reset}`;

    switch (level) {
      case "CRITICAL":
        console.error(
          `[${formattedDate}] [${greenService}] [${ANSI.bgRed}${level}${ANSI.reset}] » ${id ? "(" + id + ") " : ""}${ANSI.bgRed}${msg}${ANSI.reset}`,
        );
        break;
      case "ERROR":
        console.error(
          `[${formattedDate}] [${greenService}] [${ANSI.red}${level}${ANSI.reset}] » ${id ? "(" + id + ") " : ""}${ANSI.red}${msg}${ANSI.reset}`,
        );
        break;
      case "WARNING":
        console.warn(
          `[${formattedDate}] [${greenService}] [${ANSI.yellow}${level}${ANSI.reset}] » ${id ? "(" + id + ") " : ""}${ANSI.yellow}${msg}${ANSI.reset}`,
        );
        break;
      case "INFO":
        console.log(
          `[${formattedDate}] [${greenService}] [${ANSI.blue}${level}${ANSI.reset}] » ${id ? "(" + id + ") " : ""}${ANSI.blue}${msg}${ANSI.reset}`,
        );
        break;
      case "DEBUG":
        console.log(
          `[${formattedDate}] [${greenService}] [${ANSI.cyan}${level}${ANSI.reset}] » ${id ? "(" + id + ") " : ""}${ANSI.cyan}${msg}${ANSI.reset}`,
        );
        break;
      case "TRACE":
        console.log(
          `[${formattedDate}] [${greenService}] [${ANSI.gray}${level}${ANSI.reset}] » ${id ? "(" + id + ") " : ""}${ANSI.gray}${msg}${ANSI.reset}`,
        );
        break;
    }
  }

  /**
   * @public Logs a message to the console using the runtime's default console implementation with the **CRITICAL** Level
   *
   * @param service Service that emitted the log call
   * @param msg Message to log
   */
  public critical(service: string, msg: string, id?: string): void {
    this.log(service, msg, "CRITICAL", id);
  }
  /**
   * @public Logs a message to the console using the runtime's default console implementation with the **ERROR** Level
   *
   * @param service Service that emitted the log call
   * @param msg Message to log
   */
  public error(service: string, msg: string, id?: string): void {
    this.log(service, msg, "ERROR", id);
  }
  /**
   * @public Logs a message to the console using the runtime's default console implementation with the **WARNING** Level
   *
   * @param service Service that emitted the log call
   * @param msg Message to log
   */
  public warning(service: string, msg: string, id?: string): void {
    this.log(service, msg, "WARNING", id);
  }
  /**
   * @public Logs a message to the console using the runtime's default console implementation with the **INFO** Level
   *
   * @param service Service that emitted the log call
   * @param msg Message to log
   */
  public info(service: string, msg: string, id?: string): void {
    this.log(service, msg, "INFO", id);
  }
  /**
   * @public Logs a message to the console using the runtime's default console implementation with the **DEBUG** Level
   *
   * @param service Service that emitted the log call
   * @param msg Message to log
   */
  public debug(service: string, msg: string, id?: string): void {
    this.log(service, msg, "DEBUG", id);
  }
  /**
   * @public Logs a message to the console using the runtime's default console implementation with the **TRACE** Level
   *
   * @param service Service that emitted the log call
   * @param msg Message to log
   */
  public trace(service: string, msg: string, id?: string): void {
    this.log(service, msg, "TRACE", id);
  }
}
