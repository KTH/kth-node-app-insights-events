const appInsights = require('applicationinsights')
const appInsightsClient = appInsights.getClient()

/**
 * Send event to Application Insights tagged with event information.
 * @param {*} category the category of the event. Eg. Database, API
 * @param {*} action the action made in the application. E.g. Level.findById(id).exec()
 * @param {*} startTime the start time of the event used to calculate the elapsed time of the event.
 */
function _sendEvent (category, action, startTime) {
  let endTime = Date.now()
  let elapsedTime = endTime - startTime
  let success = true
  appInsightsClient.trackDependency(category, action, elapsedTime, success)
}

/**
 * Measuers the elapsed time of an event and send it to Application Insigths.
 * @param {*} category the category of the event. Eg. Database, API
 * @param {*} action the action made in the application. E.g. Level.findById(id).exec()
 * @param {*} fn the given function to track.
 */
function _timeThis (category, action, fn) {
  let startTime = Date.now()
  let result = fn()
  if (typeof result.then === 'function') {
    return result.then((result) => {
      _sendEvent(category, action, startTime)
      return Promise.resolve(result)
    })
  } else {
    _sendEvent(category, action, startTime)
    return result
  }
}

module.exports = {
  timeThis: _timeThis,
  timeDatabase: (action, fn) => _timeThis('Database', action, fn)
}
