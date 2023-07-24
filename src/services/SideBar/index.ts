import {currentConfig$} from "@/services/SideBar/config";
import {routerWatcherSubject$} from "@/services/RouterWatcher";
import {BehaviorSubject, distinctUntilChanged, filter, map, pluck, switchMap, tap} from "rxjs";
import {getLogger} from "@/utils";
import {Activities, SideBarItem} from "@/services/SideBar/config/types";
import {sharedServiceMgr} from "@/services/SharedServices";
import {System, systemConfig} from "@/services/System";
import {bind} from "@react-rxjs/core";

const logger = getLogger('SideBar')

export const sideBarConfigSubject$ = new BehaviorSubject({} as any)
export const activeItemSubject$ = new BehaviorSubject({} as any)


currentConfig$.pipe(pluck('currentConfig')).subscribe(sideBarConfigSubject$)
currentConfig$.pipe(
  switchMap(config => routerWatcherSubject$.pipe(
    pluck('pathname'),
    filter(x => !!x),
    distinctUntilChanged(),
    map(x => {
      const flatConfig = config.flatConfig;
      for (let i = 0; i < flatConfig.length; i++) {
        const y: SideBarItem = flatConfig[i]
        if (x.match(<RegExp>y.regx)) {
          return {
            ...y, system: systemConfig.system
          }
        }
      }
      return {
        system: systemConfig.system,
        path: x,
      }
    })),
  )).subscribe(activeItemSubject$)

sharedServiceMgr.register('SideBar', () => {
  return {
    sideBarConfigSubject$: sideBarConfigSubject$.pipe(tap(x => logger.info('sideBarConfigSubject$', x))),
    activeItemSubject$: activeItemSubject$.pipe(tap(x => logger.info('activeItemSubject$', x))),
  }
})
export const [activeItem, activeItemHandler$] = bind(activeItemSubject$)
activeItemHandler$.subscribe()
