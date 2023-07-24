import {sharedServiceMgr} from "@/services/SharedServices";
import {systemConfig} from "@/services/System";
import {map, of, pluck, switchMap, take, tap} from "rxjs";

class CommandData {
  private static getDispatchUserService$() {
    return sharedServiceMgr.getService$('Base', 'userService')
  }
  private static getCommandTools$() {
    return sharedServiceMgr.getService$('Base', 'CommandTools')
  }
  commonDataGetter$(dataName: string) {
    return of(systemConfig.isCommand).pipe(
      switchMap(x => x ?
        CommandData.getCommandTools$().pipe(map((x: any) => x.$store.state.user[dataName])) :
        CommandData.getDispatchUserService$().pipe(switchMap((x: any) => x.$handler), pluck(dataName))
      ),
      take(1)
    )
  }
  getCompanyName$() {
    return of(systemConfig.isCommand).pipe(
      switchMap(x => x ?
        CommandData.getCommandTools$().pipe(map((x: any) => x.$store.state.user.companyName)) :
        CommandData.getDispatchUserService$().pipe(switchMap((x: any) => x.$handler), pluck('dispatcherCompanyInfos', '0', 'name'))
      )
    )
  }
  getRole$() {
    return of(systemConfig.isCommand).pipe(
      switchMap(x => x ?
        CommandData.getCommandTools$().pipe(map((x: any) => x.$store.state.user.role)) :
        CommandData.getDispatchUserService$().pipe(switchMap((x: any) => x.$handler), pluck('dispatcherCompanyInfos', '0', 'rank'))
      )
    )
  }
  getEmail$() {
    return this.commonDataGetter$('email')
  }
  getName$() {
    return of(systemConfig.isCommand).pipe(
      switchMap(x => x ?
        CommandData.getCommandTools$().pipe(map((x: any) => {
          return {
            firstName: x.$store.state.user.firstName,
            lastName: x.$store.state.user.lastName,
          }
        })) :
        CommandData.getDispatchUserService$().pipe(switchMap((x: any) => x.$handler), map((x: any) => {
          return {
            firstName: x.firstName,
            lastName: x.lastName,
          }
        }))
      ),
      take(1)
    )
  }
}

const commandData = new CommandData()
sharedServiceMgr.register('CommonData', () => commandData)
