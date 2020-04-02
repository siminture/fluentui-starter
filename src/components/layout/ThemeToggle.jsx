import React from 'react';
import { CommandBarButton } from '@fluentui/react';
import { useTheme, ThemeList } from '../theme';

function ThemeToggle() {
  const { theme, changeTheme } = useTheme();
  const menuItems = Object.keys(ThemeList).map(key => ({
    key,
    text: key,
    canCheck: true,
    checked: theme === key,
    onClick: () => changeTheme(key)
  }));

  const menuProps = {
    shouldFocusOnMount: true,
    items: menuItems
  };

  return <CommandBarButton menuProps={menuProps} iconProps={{iconName:'Color'}}>{theme}</CommandBarButton>;
}

export default ThemeToggle;
