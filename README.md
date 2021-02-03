# 1 logger-line-number

nodejs logger utility with name and linen number

## Installation

npm install logger-line-number

## Usage

```javascript
const logger = require('./index.js')

logger.log('test')
//2021-02-03 13:28:30 test.js:3:8 [INFO] test

logger.error('error')
2021-02-03 13:28:30 test.js:3:8 [ERROR] error

logger.debug('debug')
//2021-02-03 13:28:30 test.js:3:8 [DEBUG] debug

logger.setLogType(logger.LOG_TYPES.NONE)  //禁用打印日志
logger.setLogType(logger.LOG_TYPES.ERROR)  //打印 错误 日志
logger.setLogType(logger.LOG_TYPES.NORMAL)  //打印 错误 消息 日志
logger.setLogType(logger.LOG_TYPES.DEBUG)  //打印 错误 消息 调试 日志
```

## Test

```javascript
npm run test
```

