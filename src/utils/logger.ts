import winston from "winston";

const IS_DEV = process.env.NODE_ENV !== "production";

const logger = winston.createLogger({
    format: winston.format.simple(),
    level: !IS_DEV ? "info" : "debug",
    transports: [new winston.transports.Console()],
});


if (IS_DEV) {
    logger.debug("Logging initialized at debug level");
}

export default logger;

