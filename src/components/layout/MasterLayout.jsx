import React from 'react';
import { Stack } from '@fluentui/react';
import Sidebar from './Sidebar';

function MasterLayout({ children }) {
  return (
    <Stack horizontal>
      <Stack.Item grow={false}>
        <Sidebar />
      </Stack.Item>
      <Stack.Item grow={true} styles={{ root: { padding: '1em' } }}>
        {children}
      </Stack.Item>
    </Stack>
  );
}

export default MasterLayout;