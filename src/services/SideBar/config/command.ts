import {Activities, SideBarConfig} from "./types";
import {System} from "@/services/System";

export const sideBarConfig: SideBarConfig = {
  prefix: '',
  items: [
    {
      path: "permissionSettings",
      title: "Permission Settings",
      regx: /^\/permissionSettings$/g,
      activities: Activities.Content,
      content: System.Dispatch
    },{
      path: "load-board",
      title: "/load board",
      regx: /^\/load-board/g,
      activities: Activities.Content,
      content: System.Carrier
    },{
      path: "dashboardv2",
      title: "/load board",
      regx: /^\/dashboardv2/g,
      activities: Activities.Content,
      content: System.Dispatch
    },
    {
      path: "market-insights",
      title: "/market insights",
      regx: /^\/market-insights/g,
      activities: Activities.Content,
      content: System.Carrier
    },{
      path: "carrier",
      title: "/carrier",
      regx: /^\/carrier/g,
      activities: Activities.Content,
      content: System.Carrier
    },
    {
      path: "assets",
      title: "Assets",
      regx: /^\/assets/g,
      activities: Activities.Content,
      content: System.Dispatch
    },
    {
      path: "fuel-card",
      title: "Fuel Card",
      regx: /^\/fuel-card/g,
      activities: Activities.Content,
      content: System.Dispatch
    },
  {
      path: "/assets",
      title: "/trailers",
      regx: /^\/assets/g,
      activities: Activities.Content,
      content: System.Dispatch
    },
    {
      path: "maintenance",
      title: "Maintenance",
      regx: /^\/maintenance/g,
      activities: Activities.Content,
      content: System.Dispatch
    },
    {
      path: "load",
      title: "Load",
      regx: /^\/load(?!.*schedule)/g,
      activities: Activities.Content,
      content: System.Dispatch
    },
     {
      path: "/load/schedule",
      title: "Fleet Schedule",
      regx: /^\/load\/schedule/g,
      activities: Activities.Content,
      content: System.Dispatch
    },
    {
      path: 'share',
      regx: /^\/share/g,
      activities: Activities.Content,
      content: System.Dispatch
    },
    {
      path: "load/loadTemplates",
      title: "Load Templates",
      regx: /^\/loadTemplates(?!.*schedule)/g,
      activities: Activities.Content,
      content: System.Dispatch
    },
    {
      path: "onboarding",
      title: "Onboarding",
      regx: /^\/onboarding/g,
      activities: Activities.Content,
      content: System.Dispatch
    },
    {
      path: "dialerSeatsPurchase",
      title: "dialerSeatsPurchase",
      regx: /^\/dialerSeatsPurchase/g,
      activities: Activities.Content,
      content: System.Dispatch
    }, {
      path: "subscription",
      title: "Subscription",
      regx: /^\/subscription/g,
      activities: Activities.Content,
      content: System.Dispatch
    },
    {
      path: "dialerSetting",
      title: "dialerSetting",
      regx: /^\/dialerSetting/g,
      activities: Activities.Content,
      content: System.Dispatch
    },

    // {
    //   path: "eld",
    //   title: "eld",
    //   regx: /^\/eld/g,
    //   activities: Activities.Content,
    //   content: System.Command
    // },
    {
      path: "insurance",
      title: "Insurance",
      regx: /^\/insurance/g,
      activities: Activities.Content,
      content: System.Dispatch
    },
  ]
};
