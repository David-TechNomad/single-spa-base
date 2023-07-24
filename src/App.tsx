import React, {useEffect, useState} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';

import {routerWatcherSubject$} from "@/services/RouterWatcher";
import CommandLike from "@/layout/CommandLike/CommandLike";

export default function App() {
  // watch location change
  const location = useLocation()
  const [pathname, setPathname] = useState(null)

  useEffect(() => {
    if (pathname !== location.pathname) {
      setPathname(pathname)
      routerWatcherSubject$.next(location)
    }
  }, [location, pathname])

  return (
    <>
      <Routes>
        <Route path='*' element={<CommandLike/>} />
      </Routes>
    </>
  );
}
