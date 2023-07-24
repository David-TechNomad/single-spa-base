import {getAppStatus, registerApplication, setBootstrapMaxTime, setMountMaxTime, start, unloadApplication, unregisterApplication} from 'single-spa';
import {sharedServiceMgr} from "@/services/SharedServices";
import {BehaviorSubject, filter, scan, Subject, take} from "rxjs";
import {SystemConfig, System as SystemType} from "@/services/System";
import { importNow, importNowList } from './services/ImportService';

declare const System: any;
// set no error when timeout
setBootstrapMaxTime(5000);
setMountMaxTime(5000);


// TODO dynamic register app
function registerDispatch() {
  registerApplication({
    name: '@tl-mf/dispatch',
    app: () => System.import(['@tl-mf/dispatch']),
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

async function  registerSearchLoad(
  props: { commandToken?: string; tlToken?: string; token?: string; env: string; type: string },
  editPermission = true /*use for  Add to my load btn*/
) {
  const status = getAppStatus('@tl-mf/carrier');
  if (status && status === 'MOUNTED') {
    await unregisterApplication('@tl-mf/carrier');
  }
  registerApplication({
    name: '@tl-mf/carrier',
    app: () => System.import("@tl-mf/carrier"),
    // @ts-ignore
    // app: () => import('http://localhost:8020/src/main.jsx'),
    activeWhen: location => true,
    customProps: { ...props, editPermission },
  });
}

async function registerTpWallet(userData: any) {
  const status = getAppStatus('@tl-mf/wallet');
  if (status && status === 'MOUNTED') {
    await unregisterApplication('@tl-mf/wallet');
  }
  registerApplication({
    name: '@tl-mf/wallet',
    app: () => System.import('@tl-mf/wallet'),
    // @ts-ignore
    // app: () => import('http://localhost:8030/src/main.jsx'),
    activeWhen: location => true,
    customProps: {...userData},
  });
}

function reMountApp(appName: string) {
  const mfName = `@tl-mf/${appName}`;
  const status = getAppStatus(mfName);
  if (status === 'MOUNTED') unloadApplication(mfName);
}

const mount$ = new Subject();
const apps$ = new BehaviorSubject(new Set())
mount$.pipe(scan((acc, value) => acc.add(value), new Set())).subscribe(apps$)

sharedServiceMgr.register('SpaService', () => {
  return {
    getMount$: () => mount$,
    getApps$: () => apps$,
    registerSearchLoad,
    registerTpWallet,
    registerCommand,
    registerDispatch,
    reMountApp,
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
    importNow('TwilioVoice').subscribe(() => {
      registerDispatch()
    })
  }
  // TODO: start after ajax
  start({
    urlRerouteOnly: false,
  });
})
