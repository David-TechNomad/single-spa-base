import {sharedServiceMgr} from "@/services/SharedServices";

export const commandTools$ = sharedServiceMgr.getService$('Base', 'CommandTools')

export const dspUserService$ = sharedServiceMgr.getService$('Base', 'userService')
