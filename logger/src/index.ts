/**
 * Contains all relevant exports of the logger module
 *
 * @module
 */

import chalk from "chalk";

/**
 * Log Levels supported by the package sorted from most important to least important
 */
type LogLevel = "CRITICAL" | "ERROR" | "WARNING" | "INFO" | "DEBUG";

/**
 * Logs a message to the console using the runtime's default console implementation
 *
 * @param service Service that emitted the log call
 * @param msg Message to log
 * @param level Log Level
 */
const log = (service: string, msg: string, level: LogLevel): void => {
  const chalkedDate = `${chalk.white(`${String(new Date().getHours()).padStart(2, "0")}:${String(new Date().getMinutes()).padStart(2, "0")}:${String(new Date().getSeconds()).padStart(2, "0")}`)}`;
  if (level == "CRITICAL" || level == "ERROR") {
    console.error(`[${chalkedDate}] [${chalk.green(service)}] » ${chalk.red(msg)}`);
  } else if (level === "WARNING") {
    console.warn(`[${chalkedDate}] [${chalk.green(service)}] » ${chalk.yellow(msg)}`);
  } else if (level === "INFO") {
    console.log(`[${chalkedDate}] [${chalk.green(service)}] » ${chalk.blue(msg)}`);
  } else {
    console.log(`[${chalkedDate}] [${chalk.green(service)}] » ${chalk.gray(msg)}`);
  }
};

/**
 * Logs a message to the console using the runtime's default console implementation with the **CRITICAL** Level
 *
 * @param service Service that emitted the log call
 * @param msg Message to log
 */
const critical = (service: string, msg: string): void => log(service, msg, "CRITICAL");

/**
 * Logs a message to the console using the runtime's default console implementation with the **ERROR** Level
 *
 * @param service Service that emitted the log call
 * @param msg Message to log
 */
const error = (service: string, msg: string): void => log(service, msg, "ERROR");

/**
 * Logs a message to the console using the runtime's default console implementation with the **WARNING** Level
 *
 * @param service Service that emitted the log call
 * @param msg Message to log
 */
const warning = (service: string, msg: string): void => log(service, msg, "WARNING");

/**
 * Logs a message to the console using the runtime's default console implementation with the **INFO** Level
 *
 * @param service Service that emitted the log call
 * @param msg Message to log
 */
const info = (service: string, msg: string): void => log(service, msg, "INFO");

/**
 * Logs a message to the console using the runtime's default console implementation with the **DEBUG** Level
 *
 * @param service Service that emitted the log call
 * @param msg Message to log
 */
const debug = (service: string, msg: string): void => log(service, msg, "DEBUG");

export default {
  critical,
  error,
  warning,
  info,
  debug,
};
