import {BehaviorSubject, combineLatest, filter, pluck, scan} from "rxjs";
import {getLogger} from "@/utils";
import {bind} from "@react-rxjs/core";
import {Path} from "react-router-dom";
import {sharedServiceMgr} from "@/services/SharedServices";
const logger = getLogger('RouterWatcher')

export const routerWatcherSubject$ = new BehaviorSubject<Path>({hash: "", pathname: "", search: ""})
export const [locationData, locationHandler$] = bind(routerWatcherSubject$.pipe(
  scan((acc, value) => [value, acc[0]], [{pathname: ''}, {pathname: ''}]),
  filter(x => x[0].pathname !== x[1].pathname),
  pluck('0')
))
locationHandler$.subscribe(logger.log)

// @ts-ignore
sharedServiceMgr.register('RouterWatcher', () => routerWatcherSubject$)
