import { Logger } from "../src/index.js";

const logger = new Logger({
  minLevel: "TRACE",
  services: ["ServiceA", "ServiceB"],
});

logger.trace(
  "ServiceA",
  "This message is a simple test message to test the @pixelic/logger library.",
  "48696921",
);
logger.debug(
  "ServiceA",
  "This message is a simple test message to test the @pixelic/logger library.",
  "48696921",
);
logger.info(
  "ServiceA",
  "This message is a simple test message to test the @pixelic/logger library.",
  "48696921",
);
logger.warning(
  "ServiceB",
  "This message is a simple test message to test the @pixelic/logger library.",
  "48696921",
);
logger.error(
  "ServiceB",
  "This message is a simple test message to test the @pixelic/logger library.",
  "48696921",
);
logger.critical(
  "ServiceB",
  "This message is a simple test message to test the @pixelic/logger library.",
  "48696921",
);
