import React from 'react';
import { Stack, styled, classNamesFunction } from '@fluentui/react';
import { ThemeToggle } from '../../molecules/ThemeToggle';
import { UserMenu } from './UserMenu';

const getStyles = ({ theme }) => {
  return {
    root: {
      borderBottomStyle: 'solid',
      borderBottomColor: theme.semanticColors.bodyFrameDivider,
      borderBottomWidth: 1,
      padding: theme.spacing.s1,
      height: 48
    }
  };
};

const getClassNames = classNamesFunction();

function TopMenuComponent({ styles, theme }) {
  const classNames = getClassNames(styles, { theme });
  return (
    <Stack
      horizontal
      horizontalAlign="end"
      className={classNames.root}
      tokens={{ childrenGap: '1em' }}>
      <UserMenu />
      <ThemeToggle />
    </Stack>
  );
}

export const TopMenu =  styled(TopMenuComponent, getStyles);
