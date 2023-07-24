import {getAppStatus, registerApplication, setBootstrapMaxTime, setMountMaxTime, start} from 'single-spa';
import {sharedServiceMgr} from "@/services/SharedServices";
import {BehaviorSubject, filter, scan, Subject, take} from "rxjs";
import {SystemConfig, System as SystemType} from "@/services/System";
// import { importNow } from './services/ImportService'; 

declare const System: any;
// set no error when timeout
setBootstrapMaxTime(5000);
setMountMaxTime(5000);


// TODO dynamic register app
function registerDispatch() {
  registerApplication({
    name: '@tl-mf/dispatch',
    // @ts-ignore
    app: () => import('http://127.0.0.1:8010/src/main.jsx'),
    activeWhen: () => true,
  });
}

function registerCommand() {
  const status = getAppStatus("tp-portal-v2");
  if (status !== "MOUNTED") {
    registerApplication({
      name: 'tp-portal-v2',
      app: () => System.import('tp-portal-v2'),
      activeWhen: () => true,
    });
  }
}

function registerSearchLoad(props: {commandToken?: string, tlToken?: string, token?: string, env: string, type: string}) {
  registerApplication({
    name: "@tl-mf/carrier",
    app: () => System.import("@tl-mf/carrier"),
    activeWhen: (location) => true,
    customProps: props,
  });
}


const mount$ = new Subject();
const apps$ = new BehaviorSubject(new Set())
mount$.pipe(scan((acc, value) => acc.add(value), new Set())).subscribe(apps$)

sharedServiceMgr.register('SpaService', () => {
  return {
    getMount$: () => mount$,
    getApps$: () => apps$,
    registerSearchLoad,
    registerCommand,
    registerDispatch
  }
})
sharedServiceMgr.getService$('spa', 'System').pipe(
  filter(x => x.system !== SystemType.Unknown),
  take(1)
).subscribe((x: SystemConfig) => {
  if(x.isCommand) {
    importNow("MarketingTools")
    registerCommand()
  } else {
    registerDispatch()
  }
  // TODO: start after ajax
  start({
    urlRerouteOnly: false,
  });
})
