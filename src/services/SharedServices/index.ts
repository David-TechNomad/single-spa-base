import {getLogger} from "@/utils";
import {BehaviorSubject, filter, map, Observable, pluck, take, tap} from "rxjs";

const windowNameSpace = '__command_shared_service__'

const logger = getLogger('sharedServices')
if (!window[windowNameSpace]) {
  window[windowNameSpace] =  class SharedServicesMgr {
    // ts-ignore
    private static services$ = new BehaviorSubject<{[key: string]: any}>({} );
    // ts-ignore
    private static servicesDataCopy: { [key: string]: any; } = {};

    static register(name: string, service: any) {
      if(SharedServicesMgr.servicesDataCopy[name]) {
        logger.withTag('Register').warn(`Duplicate: ${name}`)
      }
      SharedServicesMgr.servicesDataCopy = {...SharedServicesMgr.servicesDataCopy, [name]: service};
      SharedServicesMgr.services$.next(SharedServicesMgr.servicesDataCopy)
      logger.withTag('Register').info(`Service: ${name}. All services:`, SharedServicesMgr.servicesDataCopy)
    }

    static getService$(system: string, name: string) {
      return SharedServicesMgr.services$.pipe(
        tap(x => !x[name] ? logger.withTag('getService$').warn(`Not found: ${name} find by ${system}, waiting for register`) : ''),
        filter(x => x[name]),
        tap(x => logger.withTag('getService$').info(`Found Service ${name} find by ${system}`, x)),
        pluck(name),
        take(1)
      )
    }
    static getService(system: string, name: string) {
      if(!SharedServicesMgr.servicesDataCopy[name]) {
        logger.withTag('getService').warn(`Not found: ${name} find by ${system}`);
        throw new Error()
      }
      logger.withTag('getService').info(`Found Service ${name} find by ${system}`)
      return SharedServicesMgr.servicesDataCopy[name]
    }
  }

}

export const sharedServiceMgr = {
  // ts-ignore
  register: (name: string, service: Function) => window[windowNameSpace].register(name, service),
  getService: (system: string, name: string): Function => window[windowNameSpace].getService(system, name)(),
  getService$: (system: string, name: string): Observable<any> => window[windowNameSpace].getService$(system, name).pipe(map((x: Function) => x()))
}
