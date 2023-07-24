module.exports = {
  // system: 'Command',
  // system: 'Dispatch',
  globalImportMap: {
    MarketingTools: {
      entrance: "",
    },
    GoogleMaps: {
      entrance: "",
      options: { async: true },
    },
    GoogleRecaptcha: {
      entrance: "",
    },
    HereCore: {
      entrance: "",
    },
    HereService: {
      entrance: "",
      dependencies: ["HereCore"],
    },
    HereEvents: {
      entrance: "",
      dependencies: ["HereCore"],
    },
    TwilioVoice: {
      entrance: "",
    },
    Stripe: {
      entrance: "",
    },
    CommandZendesk: {
      entrance: "",
      options: { id: "ze-snippet" },
    },
  },
  systemsConfig: {
    Command: {
      env: "prod", //dev qa pre prod
      entrance: {
        prod: "prod-url",
      },
      globalImport: [
        "GoogleMaps",
        "HereCore",
        "HereService",
        "HereEvents",
        "Stripe",
        "CommandZendesk",
      ],
    },
    Dispatch: {
      env: "prod", //dev qa pre prod
      entrance: {
        prod: "prod-url",
      },
      globalImport: [
        "GoogleMaps",
        "HereCore",
        "HereService",
        "HereEvents",
        "TwilioVoice",
      ],
    },
    Carrier: {
      env: "prod", //dev qa pre prod
      entrance: {
        prod: "prod-url",
      },
    },
    Wallet: {
      env: "prod", //dev qa prod
      entrance: {
        prod: "prod-url",
      },
    },
  },
  env: {
    DOCUMENT_URL: "prod-url",
    TRACk_URL: "prod-url",
    VERIFY_URL: "prod-url",
    COMMAND_MOBILE: "prod-url",
  },
};
