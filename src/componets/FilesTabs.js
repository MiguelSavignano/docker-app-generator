import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { CodeSnippetTemplate } from '../CodeSnippetTemplate';
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
      {appMode.tabs.map(({ template: templateName, ...rest }, index) => (
        <TabPanel key={`${templateName}-${index}`}>
          <CodeSnippetTemplate {...{ templateName, ...rest }} />
        </TabPanel>
      ))}
    </Tabs>
  );
};
