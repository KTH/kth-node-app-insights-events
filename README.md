# kth-node-app-insights-events
Node module for event handling in Application Insights

## Usage

```javascript
// Require the module and desired function.
const timeThis = require('kth-node-app-insights-events').timeThis

// Wrap the database call and set the category and type labels.
const level = yield timeThis('Database', 'Level.findById(id).exec()', () => {
  return Level.findById(id).exec()
})
