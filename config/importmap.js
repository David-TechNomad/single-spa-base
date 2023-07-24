// For public moudle lik React, React Dom, CommonAPI(rxjs)
// TODO use api dynamic import
// Use test web entry host

const timeStamp = new Date().getTime();

// dispatch dev entry is not correct
function entry(config) {
  return config.env === 'dev' ?
    `${config.entrance.devHost}${config.entrance.dev}` :
    `${config.entrance[config.env]}?v=${timeStamp}`
}

module.exports = function (systemConfig) {
  const dispatchConfig = systemConfig.systemsConfig.Dispatch
  const commandConfig = systemConfig.systemsConfig.Command
  const carrierConfig = systemConfig.systemsConfig.Carrier
  const tpWallet = systemConfig.systemsConfig.Wallet
  return [
    {
      name: '@tl-mf/dispatch',
      entry: `${entry(dispatchConfig)}`,
    }, {
      name: 'tp-portal-v2',
      entry: `${entry(commandConfig)}`,
    }, {
      name: '@tl-mf/carrier',
      entry: `${entry(carrierConfig)}`
    }, {
      name: '@tl-mf/wallet',
      entry: `${entry(tpWallet)}`
    }
  ];
}
