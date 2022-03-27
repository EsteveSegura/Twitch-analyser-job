const env = process.env.NODE_ENV || 'run';

const run = {
  twitch: {
    clientId: process.env.TWITCH_CLIENT_ID,
    secretId: process.env.TWITCH_SECRET_ID,
    oauthUri: process.env.TWITCH_OAUTH_URI,
    twitchApiUri: process.env.TWITCH_API_URI,
  },
  sentry: {
    dsnUrl: process.env.SENTRY_DSN_URL,
  },
  cron: {
    tenSeconds: '*/10 * * * * *',
  },
  redisTimeSeries: {
    host: '10.245.10.25',
    port: 6379,
  },
  mongo: {
    mongoConnectionUri: 'mongodb://admin:admin@10.245.80.45:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
    dbName: 'twitch-analyser',
    timeout: 5000,
  },
};

const test = {
  twitch: {
    clientId: 'clientId_MOCK',
    secretId: 'secretId_MOCK',
    oauthUri: 'oauthUri_MOCK',
    twitchApiUri: 'twitchApiUri_MOCK',
  },
  sentry: {
    dsnUrl: 'sentryDsnUrl',
  },
  cron: {
    tenSeconds: '*/10 * * * * *',
  },
  redisTimeSeries: {
    host: 'testRedis',
    port: 6379,
  },
  mongo: {
    mongoConnectionUri: 'mongoConnectionUri_MOCK',
    dbName: 'dbName_MOCK',
    timeout: 5000,
  },
};

const config = {
  run,
  test,
};

module.exports = config[env];
