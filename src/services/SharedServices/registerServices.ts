import {sharedServiceMgr} from "@/services/SharedServices/index";
import {importAll, importNow, importNowList} from "@/services/ImportService";
import "@/services/CommonData"

sharedServiceMgr.register('GlobalImport', () => {
  return {
    importNow,
    importNowList,
    importAll
  }
})
