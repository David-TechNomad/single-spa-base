module.exports = {
  system: "Command",
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
      entrance: "/static/twilio.min.js",
    },
    Stripe: {
      entrance: "https://js.stripe.com/v3/",
    },
    CommandZendesk: {
      entrance:
        "https://static.zdassets.com/ekr/snippet.js?key=3126edd4-214e-4e65-8478-5c2823130282",
      options: { id: "ze-snippet" },
    },
  },
  systemsConfig: {
    Command: {
      env: "dev", //dev qa prod
      entrance: {
        devHost: "http://127.0.0.1:8080",
        dev: "/js/app.js",
        qa: "qa-url",
        prod: "",
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
      env: "dev", //dev qa prod
      entrance: {
        devHost: "http://localhost:8010",
        dev: "/src/main.jsx",
        qa: "qa-url",
        prod: "",
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
      env: "qa", //dev qa prod
      entrance: {
        devHost: "http://localhost:8020",
        dev: "/src/main.jsx",
        qa: "qa-url",
        prod: "",
      },
    },
  },
  env: {
    DOCUMENT_URL: "qa-url",
    TRACk_URL: "qa-url",
  },
};
