'use strict'

module.exports = normalizeName

function normalizeName(file_name) {
  const remove_extension = file_name.split('.')[0]
  const lowercase = remove_extension.toLowerCase()
  const normalized = lowercase.replace(/\s/g, '_')
  return normalized
}
