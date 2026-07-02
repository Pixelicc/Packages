import { Logger } from "../src/index.js";

const logger = new Logger({ minLevel: "TRACE" });

logger.trace(
  "Service",
  "This message is a simple test message to test the @pixelic/logger library.",
  "48696921",
);
logger.debug(
  "Service",
  "This message is a simple test message to test the @pixelic/logger library.",
  "48696921",
);
logger.info(
  "Service",
  "This message is a simple test message to test the @pixelic/logger library.",
  "48696921",
);
logger.warning(
  "Service",
  "This message is a simple test message to test the @pixelic/logger library.",
  "48696921",
);
logger.error(
  "Service",
  "This message is a simple test message to test the @pixelic/logger library.",
  "48696921",
);
logger.critical(
  "Service",
  "This message is a simple test message to test the @pixelic/logger library.",
  "48696921",
);
