import consola, {LogLevel} from 'consola';
import * as process from "process";

consola.wrapAll()
if (process.env.NODE_ENV === 'production') {
  consola.level = LogLevel.Warn
}

export function getLogger(name: string, tag: string = '') {
  return tag ? consola.withScope(name): consola.withScope(name).withTag(tag)
}
