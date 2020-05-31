import React from 'react';
import { Questions } from './componets/Questions';
import { FilesTabs } from './componets/FilesTabs';
import { Navbar } from './Navbar';
import AppModes from './config';
import { StateProvider, initializeFormData } from './state';

import './App.css';
import 'bulma/css/bulma.css';

function App() {
  const DEFAULT_APP = 'rails';

  const initialState = {
    form: initializeFormData(AppModes[DEFAULT_APP]),
    appMode: AppModes[DEFAULT_APP],
  };
  console.log('initialState', initialState);

  return (
    <StateProvider initialState={initialState}>
      <div className="grid-container">
        <div className="Navbar">
          <Navbar />
        </div>
        <div class="Body columns">
          <div class="column is-half">
            <Questions />
          </div>
          <div class="column is-half">
            <FilesTabs />
          </div>
        </div>
      </div>
    </StateProvider>
  );
}

export default App;
