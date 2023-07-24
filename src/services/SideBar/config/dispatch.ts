import {Activities, SideBarConfig} from "./types";
import {System} from "@/services/System";

export const sideBarConfig: SideBarConfig = {
  prefix: '',
  items: [
    {
      path: "/setting/eld/add-integration",
      title: "Eld",
      regx: /^\/setting\/eld\/add-integration/g,
      activities: Activities.Content,
      content: System.Command,
      hidden: true,
    },
    {
      path: "/setting/index",
      title: "Basic Info",
      regx: /^\/setting\/index/g,
      activities: Activities.Content,
      content: System.Command,
      hidden: true,
    },
    {
      path: "/setting/eld/align-drivers",
      title: "Eld",
      regx: /^\/setting\/eld\/align-drivers/g,
      activities: Activities.Content,
      content: System.Command,
      hidden: true,
    },
    {
      path: "/setting/eld/align-trucks",
      title: "Eld",
      regx: /^\/setting\/eld\/align-trucks/g,
      activities: Activities.Content,
      content: System.Command,
      hidden: true,
    },

    // {
    //   path: "/",
    //   regx: /^\/$/g,
    //   title: "Dashboard",
    //   icon: "map"
    // },
    {
      path: "/dashboardv2",
      title: "Dashboard",
      icon: "dashboard-v2",
      name: "dashboard",
      regx: /^\/dashboardv2/g,

      // activities: Activities.ShowContent
    },

    {
      path: "/import",
      title: "loadsImport",
      name: "import",
      regx: /^\/import/g,
      activities: Activities.Content,
      content: System.Command,
      hidden: true,
      // activities: Activities.ShowContent
    },
    {
      path: "/carrier",
      title: "Carriers",
      icon: "carrier",
      name: "carrier",
      regx: /^\/carrier/g,
      // activities: Activities.ShowContent
    },
    // {
    //   path: "/map",
    //   title: "Map",
    //   icon: "carrier",
    //   name: "map",
    //   regx: /^\/map/g,
    //   activities: Activities.Content,
    //   content: System.Command
    // },
    {
      path: "/dispatcher",
      title: "Dispatchers",
      icon: "dispatcher",
      name: "dispatcher",
      regx: /^\/dispatcher/g,
      hidden: true,
      // activities: Activities.ShowContent
    },
    {
      path: "/load",
      title: "Loads",
      name: "load",
      icon: "myloads",
      children: [
        {
          name: 'load',
          regx: /^\/load($|[^-]+)/g,
          path: "/load",
          title: "My Loads",
        },
        {
          path: "/load/schedule",
          title: "Fleet Schedule",
          name: "schedule",
          regx: /^\/load\/scheduled/g,
        },
      ]
    },
    {
      path: '/create/load',
      regx: /^\/create\/load/g,
      activePath: '/load',
      hidden: true
    },
    {
      path: "/load-board",
      title: "Load Board",
      name:'load-board',
      icon: "loads",
      children: [
        {
          name: 'search-loads',
          regx: /^\/search-loads/g,
          path: "/load-board/search-loads",
          title: "Search Loads"
        },
        {
          name: "potential-loads",
          regx: /^\/potential-loads/g,
          path: "/load-board/potential-loads",
          title: "Potential Loads"
        },
        {
          name: "connect",
          regx: /^\/load-board\/connect/g,
          path: "/load-board/connect",
          title: "Connect Brokers",
          activities: Activities.Content,
          content: System.Carrier
        },
      ]
    },
    {
      path: "/driver/index",
      title: "Drivers",
      icon: "drivers",
      name: "drivers",
      regx: /^\/driver/g,
      activities: Activities.Content,
      content: System.Command
    },
    // {
    //   path: "/driver",
    //   title: "Drivers",
    //   icon: "drivers",
    //   name: "drivers",
    //   regx: /^\/driver/g,
    // },
    {
      path: "/broker",
      title: "Brokers",
      icon: "broker",
      name: "broker",
      regx: /^\/broker/g,
    },
    //   {
    //   path: "/load/schedule",
    //   title: "schedule",
    //   icon: "broker",
    //   name: "schedule",
    //   regx: /^\/load\/scheduled/g,
    // },
    // {
    //   path: "/app",
    //   title: "App",
    //   icon: "loads",
    //   children: [
    //     {
    //       name: 'loads',
    //       regx: /^\/app\/loads/g,
    //       path: "/dispatchloads",
    //       title: "My Loads"
    //     },
    //     {
    //       path: "/dispatchschedule",
    //       regx: /^\/app\/schedule/g,
    //       name: "schedule",
    //       title: "Fleet Schedule"
    //     },
    //   ]
    // },
    // {
    //   path: "/invoice",
    //   title: "Invoice",
    //   icon: "invoice",
    //   name: "invoice",
    //   regx: /^\/invoice/g,
    // },
    {
      path: "/assets",
      title: "Assets",
      icon: "assets",
      children: [
        {
          name: 'trucks',
          regx: /^\/assets\/trucks/g,
          path: "/assets/trucks",
          title: "Trucks"
        },
        {
          path: "/assets/trailers",
          regx: /^\/assets\/trailers/g,
          name: "trailers",
          title: "Trailers"
        },{
          path: "/assets/trailer/details",
          regx: /^\/assets\/trailer\/details/g,
          hidden: true
        },
        {
          path: "/assets/trucks/details",
          regx: /^\/assets\/truck\/details/g,
          hidden: true
        },
        {
          path: "/assets/create/truck",
          regx: /^\/assets\/create\/truck/g,
          hidden: true
        },
        {
          path: "/assets/create/trailer",
          regx: /^\/assets\/create\/trailer/g,
          hidden: true
        },
        {
          path: '/assets/edit/truck',
          regx: /^\/assets\/edit\/truck/g,
          hidden: true
        },
        {
          path: '/assets/edit/trailer',
          regx: /^\/assets\/edit\/trailer/g,
          hidden: true
        }
      ]
    },
    {
      path: "/billing",
      title: "Billing",
      icon: "invoice",
      name: "invoice",
      regx: /^\/billing/g,
    },
    {
      path: "/message/index",
      title: "Messaging",
      icon: "message-v2",
      name: "message",
      regx: /^\/message/g,
      activities: Activities.Content,
      content: System.Command
    },
    // {
    //   path: "/app",
    //   title: "App",
    //   icon: "dispatcher",
    //   children: [
    //     {
    //       name: 'loads',
    //       regx: /^\/app\/loads/g,
    //       path: "/dispatchloads",
    //       title: "My Loads"
    //     },
    //     {
    //       path: "/dispatchschedule",
    //       regx: /^\/app\/schedule/g,
    //       name: "schedule",
    //       title: "Fleet Schedule"
    //     },
    //   ]
    // }
  ]
};
