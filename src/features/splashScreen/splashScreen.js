import React from 'react'
import { useRoutes } from 'react-router';
import { BubbleSvg } from '../../components/Icons/bubbleSvg/bubbleSvg';

import "./splashScreen.css";

const Splash = () => {

  return (
    <div className='bubble-splash-screen'>
    <BubbleSvg top={"-200px"} left={"-150px"} width={700} height={700} rotate={"480deg"} />
    <BubbleSvg right={"-150px"} bottom={"-150px"} width={700} height={700} rotate={"5deg"} />
    </div>
  )
}

export const SplashScreen = () => useRoutes([
  { path: "/signin", element: <Splash /> },
  { path: "/signup", element: <Splash /> }
])

