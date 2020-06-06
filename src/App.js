import React from 'react';
import { Questions } from './componets/Questions';
import { FilesTabs } from './componets/FilesTabs';
import { Navbar } from './Navbar';
import AppModes from './config';
import { StateProvider, initializeFormData, useStateValue } from './state';

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
      <div className="Navbar">
        <Navbar />
      </div>
      <div className="columns">
        <div className="section column">
          <HeaderMessage />
          <div className="columns">
            <div className="column is-half">
              <Questions />
            </div>
            <div className="column is-half">
              <FilesTabs />
            </div>
          </div>
        </div>
      </div>
    </StateProvider>
  );
}

export const HeaderMessage = () => {
  const [{ appMode }] = useStateValue();

  if (appMode.description) {
    return (
      <div
        className="notification"
        dangerouslySetInnerHTML={{ __html: appMode.description }}
      ></div>
    );
  }

  return (
    <div className="notification">
      Generate the necessary files to dockerize a{' '}
      <strong>{appMode.label} </strong>.
    </div>
  );
};

export default App;
