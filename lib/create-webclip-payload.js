'use strict'

const path = require('path')
const sharp = require('sharp')
const uuid = require('uuid')

const generateXmlElement = require('./generate-xml-element.js')
const getBundleId = require('./get-bundle-id.js')
const normalizeName = require('./normalize-name.js')
const tab = require('./tab.js')

const {WEBCLIP_XML} = require('./constants.js')
const {common, identifier, seed} = WEBCLIP_XML
const {
  icon
, label
, payload_identifier
, payload_uuid
, bundle_id
, url
} = seed

module.exports = createWebclipPayload

async function createWebclipPayload(file_name) {
  const normalized_name = normalizeName(file_name)
  const bundleid = getBundleId(normalized_name)
  if (bundleid) {
    const webclip_xml = [tab(2, '<dict>'), ...Object.values(common)]

    const icon_path = path.join(__dirname, '..', 'icons', file_name)
    const icon_processed_buffer = await sharp(icon_path).resize(114, 114).png().toBuffer()
    const icon_encoded_base64 = icon_processed_buffer.toString('base64')
    const icon_data = []
    for (let i = 0; i < icon_encoded_base64.length; i += 52) {
      const end = i + 52
      const substring = end > icon_encoded_base64.length
        ? icon_encoded_base64.substring(i, icon_encoded_base64.length)
        : icon_encoded_base64.substring(i, end)
      icon_data.push(`\t\t\t${substring}`)
    }
    webclip_xml.push(...[icon, tab(3, '<data>'), ...icon_data, tab(3, '</data>')])

    const label_string = tab(3, generateXmlElement('string', file_name.split('.')[0]))
    webclip_xml.push(...[label, label_string])

    const webclip_uuid = uuid.v4().toUpperCase()
    const webclip_identifer = tab(3, generateXmlElement('string', `${identifier}.${webclip_uuid}`))
    webclip_xml.push(...[payload_identifier, webclip_identifer])
    webclip_xml.push(...[payload_uuid, tab(3, generateXmlElement('string', webclip_uuid))])

    // const normalized_name = normalizeName(file_name)
    const bundle_id_string = tab(3, generateXmlElement('string', getBundleId(normalized_name)))
    webclip_xml.push(...[bundle_id, bundle_id_string])

    webclip_xml.push(...[url, tab(2, '</dict>')])
    return webclip_xml
  }
}