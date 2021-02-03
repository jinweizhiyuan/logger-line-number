const logger = require('./index.js')

logger.log('test')

logger.setLogType(logger.LOG_TYPES.ERROR)

logger.log('test2')
logger.error('error')