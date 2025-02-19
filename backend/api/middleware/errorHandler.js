import logger from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  logger.error(`[${req.method}] ${req.url} - ${err.message}`, {
    stack: err.stack,
  });

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: "NFT ID already exists" });
  }

  res.status(500).json({ message: "Internal server error" });
};
