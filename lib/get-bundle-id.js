'use strict'

const APP_BUNDLE_ID_MAP = new Map([
  ['airbnb', 'com.airbnb.app']
])

module.exports = getBundleId

function getBundleId(normalized_name) {
  return APP_BUNDLE_ID_MAP.get(normalized_name)
}
