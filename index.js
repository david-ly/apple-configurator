'use strict'

const {promisify} = require('util')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const uuid = require('uuid')

const createWebclipPayload = require('./lib/create-webclip-payload.js')

const readdir = promisify(fs.readdir)
const writeFile = promisify(fs.writeFile)

const {CONFIG_XML} = require('./lib/constants.js')

const app_url_map = {
  airbnb: 'airbnb://'
}

async function main() {
  const {start, payload_uuid, end} = CONFIG_XML
  const config_xml = [...start]

  const icons_dir = path.join(__dirname, 'icons')
  const icon_files = await readdir(icons_dir)
  for (const file_name of icon_files) {
    const icon_webclip_xml = await createWebclipPayload(file_name)
    if (icon_webclip_xml) config_xml.push(...icon_webclip_xml)
  }

  config_xml.push('\t</array>')
  const config_uuid = uuid.v4().toUpperCase()
  const uuid_string = `\t<string>${config_uuid}</string>`
  config_xml.push(...[payload_uuid, uuid_string])
  
  config_xml.push(...end)
  const config = config_xml.join('\n')
  await writeFile(path.join(__dirname, 'configuration-payloads', 'test-theme.mobileconfig'), config)
  return 'done'
}

main()
.then((res) => {console.log(res)})
.catch((err) => {console.log(err)})

// const rest = {
  // airbnb: 'airbnb://'
// , Amazon: ''
// , Amex: ''
// , Authenticator: ''
// , app_store: 'itm-apps'
// , Calculator: 'calc://'
// , Camera: 'camera://'
// , CamScanner: ''
// , Chipote: ''
// , ClimaCell: ''
// , Clock: 'clock://'
// , Contacts: 'contact://'
// , Discord: ''
// , Docs: ''
// , DoorDash: ''
// , Drive: ''
// , Duo_Mobile: ''
// , Duolingo: ''
// , Experian: ''
// , Facebook: ''
// , Facetime: ''
// , Find_My: ''
// , Files: ''
// , Fitness: 'fitnessapp://'
// , GitHub: ''
// , Gmail: ''
// , Google_Calendar: ''
// , Google_Maps: ''
// , Google:
// , GrubHub: ''
// , Health: ''
// , Hopper: ''
// , Instagram: ''
// , Lyft: ''
// , Mail: ''
// , Messages: ''
// , Messenger: ''
// , Mint: ''
// , Netflix: ''
// , Notes: ''
// , Okta_Verify: ''
// , Openpath: ''
// , PagerDuty: ''
// , Phone: ''
// , Photos: ''
// , Podcasts: ''
// , Reddit: ''
// , Reminders: ''
// , Robinhood: ''
// , Safari: ''
// , Schwab: ''
// , Settings: ''
// , Shazam: ''
// , Sheets: ''
// , Shortcuts: ''
// , Slack: ''
// , Slite: ''
// , Snapchat: ''
// , Soundcloud: ''
// , Spotify: ''
// , Stocks: ''
// , Target: ''
// , Tesla: ''
// , TV: ''
// , Translate: ''
// , Twitch: ''
// , Twitter: ''
// , Uber: ''
// , UNIQLO: ''
// , Venmo: ''
// , Wallet: ''
// , Watch: ''
// , Weather: ''
// , Wells_Fargo: ''
// , Youtube: ''
// , Zoom: ''
// }

// Currently unused icons
// 1Password:
// , AirPods:
// , Among Us:
// , Audible:
// , Badoo:
// , Bolt:
// , Bookmark:
// , Cashapp:
// , Chat:
// , Chrome:
// , Credit Card: 
// , Crunchyroll:
// , Disney_Plus:
// , Documents:
// , Dribble:
// , Dropbox:
// , Ebay:
// , Etsy:
// , Evernote:
// , Firefox:
// , Gear:
// , Google Analytics:
// , Google Classroom:
// , Home:
// , House Party:
// , Hulu:
// , Inshot:
// , Lightroom:
// , LinkedIn:
// , Meet:
// , Notion:
// , Paypal:
// , Music:
// , News:
// , Photos 2:
// , Pinterest:
// , Skype:
// , Telegram:
// , Tidal:
// , TikTok:
// , Tinder:
// , Trello:
// , Tumblr:
// , VSCO:
// , Viber:
// , Waze:
// , Whatsapp: