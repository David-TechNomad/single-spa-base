import {sharedServiceMgr} from "@/services/SharedServices";
import {map, pluck, startWith, switchMap, tap} from "rxjs";
import {bind} from "@react-rxjs/core";
const mySystem = 'Base'

// DispatchCommandLike
const dispatchCommandLike$ = sharedServiceMgr.getService$(mySystem, 'DispatchCommandLike')

export const [rightSideData, rightSideDataHandler$]  = bind(dispatchCommandLike$.pipe(
  switchMap((x: any) => x.$handler.pipe(pluck('rightSide'))),
  startWith([])
))
rightSideDataHandler$.subscribe()
