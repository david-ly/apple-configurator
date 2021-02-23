'use strict'

const generateXmlElement = require('./generate-xml-element.js')
const tab = require('./tab.js')

const payload_display_name = generateXmlElement('key', 'PayloadDisplayName')
const payload_identifier = generateXmlElement('key', 'PayloadIdentifier')
const payload_type = generateXmlElement('key', 'PayloadType')
const payload_uuid = generateXmlElement('key', 'PayloadUUID')
const payload_version = generateXmlElement('key', 'PayloadVersion')
const payload_version_integer = generateXmlElement('integer', '1')

const CONFIG_XML = {
  start: [
    '<?xml version="1.0" encoding="UTF-8"?>'
  , '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">'
  , '<plist version="1.0">'
  , '<dict>'
  , tab(1, generateXmlElement('key', 'PayloadContent'))
  , tab(1, '<array>')
  ]
, payload_uuid: tab(1, payload_uuid)
, end: [
    tab(1, payload_display_name)
	, tab(1, generateXmlElement('string' , 'Theme'))
	, tab(1, payload_identifier)
	, tab(1, generateXmlElement('string', 'configurator.apple.setup.personal.theme'))
	, tab(1, generateXmlElement('key', 'PayloadRemovalDisallowed'))
	, tab(1, '<false/>')
	, tab(1, payload_type)
	, tab(1, generateXmlElement('string', 'Configuration'))
  , tab(1, payload_version)
  , tab(1, payload_version_integer)
  , '</dict>'
  , '</plist>\n'
  ]
}

const WEBCLIP_XML = {
  common: {
    full_screen: [
      tab(3, generateXmlElement('key', 'FullScreen'))
    , tab(3, '<true/>')
    ].join('\n')
  , is_removable: [
      tab(3, generateXmlElement('key', 'IsRemovable'))
    , tab(3, '<true/>')
    ].join('\n')
  , payload_description: [
      tab(3, generateXmlElement('key', 'PayloadDescription'))
    , tab(3, generateXmlElement('string', 'Configures settings for a web clip'))
    ].join('\n')
  , payload_display_name: [
      tab(3, payload_display_name)
    , tab(3, generateXmlElement('string', 'Web Clip'))
    ].join('\n')
  , payload_type: [
      tab(3, payload_type)
    , tab(3, generateXmlElement('string', 'com.apple.webClip.managed'))
    ].join('\n')
  , payload_version: [
      tab(3, payload_version)
    , tab(3, payload_version_integer)
    ].join('\n')
  }
, identifier: 'com.apple.webClip.managed'
, seed: {
    icon: tab(3, generateXmlElement('key', 'Icon'))
  , label: tab(3, generateXmlElement('key', 'Label'))
  , payload_identifier: tab(3, payload_identifier)
  , payload_uuid: tab(3, payload_uuid)
  , bundle_id: tab(3, generateXmlElement('key', 'TagetApplicationBundleIdentifier'))
  , url: [
      tab(3, generateXmlElement('key', 'URL'))
    , tab(3, generateXmlElement('string', 'null'))
    ].join('\n')
  }
}

module.exports = {CONFIG_XML, WEBCLIP_XML}
