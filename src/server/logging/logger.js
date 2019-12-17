import { createLogger, format, transports } from 'winston'
// import { getCorrelationId, getUsername, getApp } from 'server/utils/session'

// const diagnosticsFormat = format(message => ({
//   ...message,
//   correlationId: getCorrelationId(),
//   username: getUsername(),
//   origin: getApp(),
//   serviceVersion: process.env.SERVICE_VERSION,
// }))

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.label({ label: 'Case Manager Server' }),
    format.timestamp(),
    // diagnosticsFormat(),
    format.json(),
  ),
  transports: [new transports.Console()],
})

export const logInfo = (message, details) => logger.info(message, { details })
export const logError = (message, details) => logger.error(message, { details })
export const logWarn = (message, details) => logger.warn(message, { details })

export default logger
