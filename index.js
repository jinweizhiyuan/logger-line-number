const PATH = require('path')
const LOG_TYPES = {
    NONE: 0,
    ERROR: 1,
    NORMAL: 2,
    DEBUG: 3,
}
let logType = LOG_TYPES.NORMAL

let getStackTrace = function () {
    let obj = {};
    // Error.captureStackTrace(target:Object, constructor:Function)
    // Error.captureStackTrace to capture the stack-trace where you throw the error.
    Error.captureStackTrace(obj, getStackTrace)
    return obj.stack
}

let mylogger = function () {
    let stack = getStackTrace()
    // at new CError (/Users/zyf/myStudy/demo/chatroom/utils/server/Error.js:40:11)
    // at register (/Users/zyf/myStudy/demo/chatroom/server/controller/user.js:9:23)
    // at process._tickCallback (internal/process/next_tick.js:68:7)"
    let matchstack = stack.match(/\(.*?\)/g) || []  // 获取调用栈所有括号中的内容
    let line = matchstack[2] || "" // 第0个调用是 let stack = getStackTrace() 第1个调用栈是调用 mylooger的地方
    let args = Array.from(arguments)
    let fileAndLine = line.substring(line.lastIndexOf(PATH.sep) + 1, line.length - 1)
    var date = formDate("YYYY-mm-dd HH:MM:SS")
    args.unshift(date, fileAndLine)
    console.log.apply(console, args)
}

/**
 * 日期格式化输出
 * @param fmt {string} 输出格式 'YYYY-mm-dd HH:MM:SS'
 * @param date {date}  待格式化的日期
 * @returns {string}   输出格式化后的日期
 * @example  formatDate2('YYYY-mm-dd HH:MM:SS') => 2021-01-26 17:15:56
 */
let formDate = function (fmt, date) {
    if (!date) {
        date = new Date()
    }

    var opt = {
        "Y+": date.getFullYear().toString(),
        "m+": (date.getMonth() + 1).toString(),
        "d+": date.getDate().toString(),
        "H+": date.getHours().toString(),
        "M+": date.getMinutes().toString(),
        "S+": date.getSeconds().toString(),
    }

    for (let k in opt) {
        let reg = new RegExp("(" + k +")")
        let match = reg.exec(fmt)
        if (match) {
            fmt = fmt.replace(match[1], match[1].length == 1 ? opt[k] : opt[k].padStart(match[1].length, "0"))
        }
    }

    return fmt
}

let log = function () {
    if (logType < LOG_TYPES.NORMAL) return
    let args = Array.from(arguments)
    args.unshift('[INFO]')
    mylogger(...args)
}

let error = function () {
    if (logType < LOG_TYPES.ERROR) return
    let args = Array.from(arguments)
    args.unshift('[ERROR]')
    mylogger(...args)
}

let debug = function () {
    if (logType < LOG_TYPES.DEBUG) return
    let args = Array.from(arguments)
    args.unshift('[DEBUG]')
    mylogger(...args)
}

let setLogType = function (type) {
    if (typeof(type) != "number") return
    logType = type
}

module.exports = {
    LOG_TYPES,
    setLogType,
    log, error, debug
}