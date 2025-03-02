// library's
import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsElectron } from './AppFeature';
import { BrowserRouter, HashRouter } from 'react-router-dom';

function App() {

  const isElectron = useSelector(selectIsElectron);

  const Router = isElectron ? HashRouter : BrowserRouter;

  return (
    <Router>
      <div className={`App`}>
        
      </div>
    </Router>
  );
}

export default App;