import {commandSystemDomain, dispatchSystemDomain} from "@/services/System/config";
import * as process from "process";
import {getLogger} from "@/utils";
import {sharedServiceMgr} from "@/services/SharedServices";

export enum System {
  Dispatch = 'Dispatch',
  Command = 'Command',
  Carrier = 'Carrier',
  Unknown = 'Unknown'
}

export interface SystemConfig {
  system: System;
  isDispatch?: boolean,
  isCommand?: boolean,
  globalImport?: string[],
}
export let systemConfig: SystemConfig = {system: System.Unknown}

const node_env = process.env.NODE_ENV;
const systemSetting = (process.env.SYSTEM_CONFIG as any) as SystemConfig;

const logger = getLogger('System')
logger.info('systemSetting', systemSetting)

function checkSystemAndLoadSubSystem(){
  let isDispatchDev = false;
  if(commandSystemDomain[location.host]) {
    systemConfig.system = System.Command
  } else if (dispatchSystemDomain[location.host]) {
    systemConfig.system = System.Dispatch
  } else if(node_env !== 'production') {
    systemConfig.system = systemSetting.system;
    isDispatchDev = (systemSetting as any).systemsConfig.Dispatch.env === 'dev'
  } else {
    logger.error('System is Unknown! Pls set your envconfig.dev.js')
  }
  logger.info(systemConfig.system)
  if(systemConfig.system === System.Command) {
    systemConfig.isCommand = true
  } else if(systemConfig.system === System.Dispatch) {
    systemConfig.isDispatch = true
  }
  systemConfig.globalImport = (systemSetting as any).systemsConfig[systemConfig.system].globalImport;
  // @ts-ignore
  isDispatchDev ? require('@/tl-mf-config.dispatch-dev') : require('@/tl-mf-config')
}

checkSystemAndLoadSubSystem()
// @ts-ignore
sharedServiceMgr.register('System', () => systemConfig)
