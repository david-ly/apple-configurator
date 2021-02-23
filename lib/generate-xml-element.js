'use strict'

module.exports = generateXmlElement

function generateXmlElement(tag, value) {
  return `<${tag}>${value}</${tag}>`
}
