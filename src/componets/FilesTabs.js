import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Templates from '../templates';
import { useStateValue } from '../state';

import 'react-tabs/style/react-tabs.css';

export const FilesTabs = () => {
  const [{ appMode }] = useStateValue();

  return (
    <Tabs>
      <TabList>
        {appMode.tabs.map(({ fileName }, index) => (
          <Tab key={`${fileName}-${index}`}>{fileName}</Tab>
        ))}
      </TabList>
      {appMode.tabs.map(({ component, ...rest }, index) => (
        <TabPanel key={`${component}-${index}`}>
          {React.createElement(
            Templates[component] ||
              (() => <h1>Not found template: {component}</h1>),
            rest || {},
          )}
        </TabPanel>
      ))}
    </Tabs>
  );
};
