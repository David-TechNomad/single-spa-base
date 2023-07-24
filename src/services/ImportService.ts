import {AsyncSubject, Observable, Subscriber, forkJoin, Subject} from "rxjs";
import {systemConfig} from "@/services/System";
import * as process from "process";
import {getLogger} from "@/utils";
const importMap = (process.env.SYSTEM_CONFIG as any);

const logger = getLogger('GlobalImport')

class LoadService {
  private static loaded : string[]= [];
  private static loading = {};

  static _loadInScript(tag: string, path: string, options: any, loadHandler$: Subject<any>) {
    logger.info(`start: ${path}`)
    new Observable(subscribe => {
      const element = document.createElement(tag) as any;
      element.src = path;
      options['defer'] ? element.defer = true : element.async = true;
      Object.assign(element, options);
      if (element['readyState']) {  // IE
        element.onreadystatechange = () => {
          if (element.readyState === 'loaded' || element.readyState === 'complete') {
            LoadService.complete(path, subscribe);
            element.onreadystatechange = null;
          }
        };
      } else {  // Others
        element.onload = () => {
          LoadService.complete(path, subscribe);
        };
      }
      element.onerror = () => {
        LoadService.error(path, subscribe)
      }
      document.body.appendChild(element);
    }).subscribe(loadHandler$);
  }
  static complete(path: string, subscribe: Subscriber<any>) {
    logger.info(`complete: ${path}`)
    subscribe.next(null);
    subscribe.complete();
    delete LoadService.loading[path];
    LoadService.loaded.push(path);
  }
  static error(path: string, subscribe: Subscriber<any>) {
    logger.info(`error: ${path}`);
    subscribe.error('Error!');
    subscribe.complete();
    delete LoadService.loading[path];
  }
  static load(path: string, tag = 'script', options:any = {}, dependencies: any = null) {
    const loadHandler$ = new AsyncSubject();
    if (LoadService.loaded.indexOf(path) !== -1) {
      loadHandler$.next(null);
      loadHandler$.complete();
      return loadHandler$;
    } else if (path in LoadService.loading) {
      return LoadService.loading[path];
    } else {
      LoadService.loading[path] = loadHandler$;
      if(dependencies && dependencies.length) {
        importNowList(dependencies).subscribe(() => {
          this._loadInScript(tag, path, options, loadHandler$)
        })
      } else {
        this._loadInScript(tag, path, options, loadHandler$)
      }
      return loadHandler$;
    }
  }
}

export function importNow(name: string) {
  const config = importMap.globalImportMap[name]
  if(config) {
    return LoadService.load(config.entrance, 'script', config.options, config.dependencies)
  } else {
    throw Error(`Can not find '${name}' importMap`)
  }
}

export function importNowList(name: string[]) {
  return forkJoin(name.map(item => importNow(item)))
}
export function importAll() {
  systemConfig.globalImport?.forEach(importNow)
}

