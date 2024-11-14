const winston = require('winston')
require('winston-daily-rotate-file')

const morgan = require('morgan')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ level, message, timestamp , stack }) => {
        let logEntry = `${timestamp} [${level}: ${message}]`
        if(stack){
          logEntry += `n\${stack}`
        }
        return logEntry
      })
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({filename: 'Combined.log' }),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
  });
  
  module.exports = logger;