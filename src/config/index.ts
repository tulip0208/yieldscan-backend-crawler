import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const DEFAULT_PORT = '4000';

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT || DEFAULT_PORT, 10),

  /**
   * That long string from mongo atlas
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL,
  },

  /**
   * Used by winston logger
   */
  domain: {
    level: process.env.domain,
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
  wsProviderUrl: process.env.WS_KUSAMA_PROVIDER_URL,

  networks: [
    // {
    //   name: 'polkadot',
    //   wsProviderUrl: process.env.WS_POLKADOT_PROVIDER_URL,
    //   decimalPlaces: 10,
    //   erasPerDay: 1,
    //   lockUpPeriod: 28,
    //   testnet: false,
    // },
    {
      name: 'kusama',
      wsProviderUrl: process.env.WS_KUSAMA_PROVIDER_URL,
      decimalPlaces: 12,
      erasPerDay: 4,
      lockUpPeriod: 7,
      testnet: false,
    },
    // {
    //   name: 'westend',
    //   wsProviderUrl: process.env.WS_WESTEND_PROVIDER_URL,
    //   decimalPlaces: 12,
    //   erasPerDay: 4,
    //   lockUpPeriod: 7,
    //   testnet: true,
    // },
  ],

  crawlers: {
    apiCrawlers: [
      {
        enabled: process.env.CRAWLER_ERA_POINTS_HISTORY_ENABLE,
        module: require('../services/crawlers/historyData'),
      },
      {
        enabled: process.env.CRAWLER_TOTAL_REWARD_HISTORY,
        module: require('../services/crawlers/historyTotalRewards'),
      },
      {
        enabled: process.env.CRAWLER_VALIDATORS_ENABLED,
        module: require('../services/crawlers/validators'),
      },
      {
        enabled: process.env.CRAWLER_COUNCIL_ENABLED,
        module: require('../services/crawlers/council'),
      },
      // {
      //   enabled: process.env.CRAWLER_ACCOUNT_IDENTITY,
      //   module: require('../services/crawlers/accountIdentity'),
      // },
    ],
    nonApiCrawlers: [
      {
        enabled: process.env.CRAWLER_ACTIVE_NOMINATORS_ENABLED,
        module: require('../services/crawlers/activeNominators'),
      },
      {
        enabled: process.env.CRAWLER_NOMINATOR_HISTORY_ENABLE,
        module: require('../services/crawlers/nominatorsHistoryData'),
      },
    ],
  },
};
