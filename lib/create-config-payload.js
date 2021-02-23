'use strict'

const {promisify} = require('util')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')

const {CONFIG_XML} = require('./lib/constants.js')

module.exports = createConfigPayload

function createConfigPayload(icons_dir) {
  const {start, payload_uuid, end} = CONFIG_XML
  const config_xml = [start]

  const icon_files = await readdir(icons_dir)
  for (const file_name of icon_files) {
    const icon_webclip_xml = createWebclipPayload(file_name)
    config_xml.push(icon_webclip_xml)
  }
}