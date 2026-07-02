import { Logger } from "./src/index.js";

const logger = new Logger();

logger.trace("A", "B", "C");
logger.debug("A", "B", "C");
logger.info("A", "B", "C");
logger.warning("A", "B", "C");
logger.error("A", "B", "C");
logger.critical("A", "B", "C");
