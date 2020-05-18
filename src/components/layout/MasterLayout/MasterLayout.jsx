import React from 'react';
import { Stack, styled, classNamesFunction } from '@fluentui/react';
import { Sidebar } from '../Sidebar';
import { TopMenu } from '../TopMenu';

const getStyles = ({ theme }) => {
  return {
    root: {},
    sidebar: {},
    contentWrapper: {
      paddingLeft: theme.spacing.l2,
      paddingRight: theme.spacing.l2
    }
  };
};

const getClassNames = classNamesFunction();

function MasterLayoutComponent({ children, theme, styles }) {
  const classNames = getClassNames(styles, { theme });
  return (
    <Stack horizontal className={classNames.root}>
      <Stack.Item grow={false} className={classNames.sidebar}>
        <Sidebar />
      </Stack.Item>
      <Stack.Item grow={true}>
        <TopMenu />
        <Stack className={classNames.contentWrapper}>{children}</Stack>
      </Stack.Item>
    </Stack>
  );
}

export const MasterLayout = styled(MasterLayoutComponent, getStyles);
