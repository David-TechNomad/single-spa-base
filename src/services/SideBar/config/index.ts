import {System, systemConfig} from "@/services/System";
import {filter, map, Observable, of, switchMap, tap} from "rxjs";
import {sideBarConfig as dispatchConfig} from "@/services/SideBar/config/dispatch";
import {sideBarConfig as commandConfig} from "@/services/SideBar/config/command";
import {SideBarConfig, SideBarItem} from "@/services/SideBar/config/types";

const ct = {
  [System.Dispatch]: dispatchConfig,
  [System.Command]: commandConfig,
}

function flat(config: SideBarItem[], fatherPath: string): SideBarItem[]{
  const sideBarFlatRegx: SideBarItem[] = []
  function _flat(config: SideBarItem[], fatherPath: string) {
    config.forEach(x => {
      const activePath = x.activePath ? x.activePath : fatherPath ? `${fatherPath}/${x.path}` : x.path;
      if(x.regx) {
        x.activePath = activePath;
        sideBarFlatRegx.push(x)
      }
      if(x.children) {
        _flat(x.children, <string>activePath)
      }
    })
  }
  _flat(config, fatherPath)
  return sideBarFlatRegx;
}


export const currentConfig$: Observable<{currentConfig: SideBarConfig; flatConfig: SideBarItem[]}> = of(systemConfig.system).pipe(
  map(x => ct[x]),
  switchMap(config => new Observable<SideBarConfig>((observer) => observer.next(config))),
  map(config => {
    return {
      currentConfig: config as SideBarConfig,
      flatConfig: flat(config.items, '') as SideBarItem[]
    }
  })
)
