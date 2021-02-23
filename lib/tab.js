'use strict'

module.exports = tab

function tab(num, string) {
  const string_parts = []
  for (let i = 0; i < num; i++) {
    string_parts.push('\t')
  }
  string_parts.push(string)

  return string_parts.join('')
}