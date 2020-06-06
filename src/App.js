import React from 'react';
import { Questions } from './componets/Questions';
import { FilesTabs } from './componets/FilesTabs';
import { Navbar } from './Navbar';
import AppModes from './config';
import { StateProvider, initializeFormData } from './state';

import './App.css';
import 'bulma/css/bulma.css';
import './vendor/font-awesome-4.7.0/css/font-awesome.css';

function App() {
  const DEFAULT_APP = 'react-create-app';

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
        <section className="section columns">
          <section className="column is-half">
            <Questions />
          </section>
          <section className="column is-half">
            <FilesTabs />
          </section>
        </section>
      </div>
    </StateProvider>
  );
}

export default App;
