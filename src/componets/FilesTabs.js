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
      {appMode.tabs.map(({ template, ...rest }, index) => (
        <TabPanel key={`${template}-${index}`}>
          {React.createElement(
            Templates[template] ||
              (() => <h1>Not found template: {template}</h1>),
            rest || {},
          )}
        </TabPanel>
      ))}
    </Tabs>
  );
};
