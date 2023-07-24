import {System} from "@/services/System";

export enum Activities {
  Full,
  Content,
}

export interface SideBarItem {
  path?: string;
  title?: string;
  icon?: string;
  name?: string;
  regx?: RegExp;
  hidden?: boolean
  activePath?: string,
  children?: SideBarItem[],
  activities?: Activities,
  content?: System,
  system?: System
}

export interface SideBarConfig {
  prefix: string;
  items: SideBarItem[]
}
