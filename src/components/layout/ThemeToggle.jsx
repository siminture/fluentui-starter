import React from 'react';
import { CommandBarButton } from '@fluentui/react';
import { useTheme, ThemeList } from '../theme';

function ThemeToggle({ as = CommandBarButton }) {
  const ButtonComponent = as;
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

  return (
    <ButtonComponent menuProps={menuProps} iconProps={{ iconName: 'Color' }}>
      {theme}
    </ButtonComponent>
  );
}

export default ThemeToggle;
