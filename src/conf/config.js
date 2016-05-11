/* eslint-env node */
/* eslint no-process-env: 0 */

const Config = {
  appPort: process.env.PORT || 3000,
  oauthToken: process.env.EVERNOTE_DEVELOPER_TOKEN,
  baseJsPath: '/static/js',
  baseImagePath: '/static/img',
  noteGuid: '082dff31-628f-4006-8b27-23f043559b3f',
};

Config.baseJsUrl = Config.baseJsPath;
Config.baseCssUrl = Config.baseJsPath;

try {
  const LocalOverrides = require('./Config.local');
  LocalOverrides.override(Config);
} catch (e) {
  // expected
}

module.exports = Config;
