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
      env: "pre", //dev qa pre prod
      entrance: {
        pre: "pre-url",
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
      env: "pre", //dev qa pre prod
      entrance: {
        pre: "pre-url",
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
      env: "pre", //dev qa pre prod
      entrance: {
        pre: "pre-url",
      },
    },
    Wallet: {
      env: "pre", //dev qa prod
      entrance: {
        pre: "pre-url",
      },
    },
  },
  env: {
    DOCUMENT_URL: "pre-url",
    TRACk_URL: "pre-url",
    VERIFY_URL: "pre-url",
    COMMAND_MOBILE: "pre-url",
  },
};
