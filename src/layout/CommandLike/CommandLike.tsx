import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router';
import styles from './_command-like.module.scss'
import classNames from "classnames";
import {activeItem} from "@/services/SideBar";
import {getLogger} from "@/utils";
import {System} from "@/services/System";
import {Activities, SideBarItem} from "@/services/SideBar/config/types";
import { sideBarConfig } from '@/services/SideBar/config/command';
import { commandTools$, dspUserService$ } from '@/services/shared-services'
import { systemConfig } from "@/services/System";
import { pluck } from 'rxjs'

export type CommandLikeProps = {}

const logger = getLogger('Layout', 'CommandLike')

// use self sideBar
class SubsystemLayoutControl2 {
  private system: System;

  constructor(system: System) {
    this.system = system
  }

  class(activeItem: SideBarItem = {}) {
    const cs = this._class(activeItem)
    logger.info(`${this.system} layout:`, cs)
    return cs
  }
  _class(activeItem: SideBarItem = {}) {
    //
    if (activeItem.activities === Activities.Full) {
      return activeItem.system === this.system ? styles.show : styles.hide
    }
    // default activities is content
    if (!activeItem.activities || activeItem.activities === Activities.Content) {
      return activeItem.system === this.system ? styles.show :
        activeItem.content === this.system ? styles.content : '';
    }
  }
}

const commandLayoutControl = new SubsystemLayoutControl2(System.Command)
const dispatchLayoutControl = new SubsystemLayoutControl2(System.Dispatch)
// const carrierLayoutControl = new SubsystemLayoutControl2(System.Carrier)

export default function CommandLike(props: CommandLikeProps) {
  const [topHeight, setTopHeight] = useState(0)
  const mActiveItem = activeItem();
  useEffect(() => {
    let $: any = null
    if (systemConfig?.isCommand) {
      commandTools$.subscribe((x: any) => {
        try {
          $ = x.watch$((s: any) => s.user)
          $.subscribe((user: any) => {
            setTopHeight(user.topHeight)
          })
        } catch {
          setTopHeight(0)
        }
      })
    } else {
      dspUserService$.subscribe(user => {
        $ = user.$handler.pipe(pluck('topHeight')).subscribe((topHeight: number) => {
          setTopHeight(topHeight || 0)
        })
      })
    }
    return () => {
      if (systemConfig?.isCommand) {
        $ && $.complete()
      } else {
        $ && $.unsubscribe()
      }
    }
  }, [systemConfig.system])
  return (
    <>
      <div className={styles.commandLike}>
        <div id="top-bar" className={styles.topBar}/>
        <div id="side-bar" className={styles.sideBar} style={{ marginTop: `-${topHeight}px` }}/>
        <div className={styles.subSystem}>
          <div className={classNames(styles.command, commandLayoutControl.class(mActiveItem))} id={'app'}/>
          <div className={classNames(styles.dispatch, dispatchLayoutControl.class(mActiveItem))} id={'single-spa-application:@tl-mf/dispatch'}/>
        </div>
        <div id="right-view" className={styles.rightSide} style={{ height: `calc(100vh - ${topHeight}px)`, top: `${topHeight}px` }}/>
        <div id="float-icon" className={styles.floatIcon}/>
        <div id="chatbox" className={styles.chatBox} />
        <div id="base-popup" className={styles.basePopup}>
          <div id='carrier-popup' className='tl-carrier-root'></div>
        </div>
      </div>
    </>

  );
}
