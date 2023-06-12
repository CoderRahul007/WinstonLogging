const winston = require('winston');
const { format } = require('logform');
const { combine, timestamp, label, printf } = format;
const moment = require('moment');
const path = require('path');

// Define the log format
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// Create a function to generate the log file name based on the current date
function getLogFileName(type) {
  const currentDate = moment().format('YYYY-MM-DD');
  return `${type}_${currentDate}.log`;
}

// Create a logger for Info logs
const infoLogger = winston.createLogger({
  level: 'info',
  format: combine(
    label({ label: 'Info' }),
    timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, 'Info', getLogFileName("Info"))
    })
  ]
});

// Create a logger for Error logs
const errorLogger = winston.createLogger({
  level: 'error',
  format: combine(
    label({ label: 'Error' }),
    timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, 'Error', getLogFileName("Error"))
    })
  ]
});

// Create a logger for DB logs
const dbLogger = winston.createLogger({
  level: 'info',
  format: combine(
    label({ label: 'DBLogs' }),
    timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, 'DBLogs', getLogFileName("DBLogs"))
    })
  ]
});

// Create a logger for Output logs
const outputLogger = winston.createLogger({
  level: 'info',
  format: combine(
    label({ label: 'Outputs' }),
    timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, 'Outputs', getLogFileName("Outputs"))
    })
  ]
});

// Log messages using the respective loggers
infoLogger.info('This is an info message.');
errorLogger.error('This is an error message.');
dbLogger.info('This is a DB log message.');
outputLogger.info('This is an output log message.');
