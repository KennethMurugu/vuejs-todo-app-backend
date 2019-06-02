exports.SUCCESS = 1
exports.FAILED = 0
exports.UNAUTHORIZED = -1

/**
 * @param {Response} response
 */
exports.jsonOut = function (response, code, msg, data) {
    response.setHeader("Content-Type", "application/json")
    // response.setHeader("Access-Control-Allow-Origin", "*")

    let r = {
        resultcode: code,
        msg: msg,
        data: data || []
    }

    response.send(JSON.stringify(r))
}