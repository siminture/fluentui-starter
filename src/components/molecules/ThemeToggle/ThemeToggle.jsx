import React from 'react';
import { CommandBarButton } from '@fluentui/react';
import { useTheme, ThemeList } from '../../util/theme';

export function ThemeToggle({ as = CommandBarButton }) {
  const ButtonComponent = as;
  const { theme, changeTheme } = useTheme();
  const menuItems = Object.keys(ThemeList).map(key => ({
    key,
    text: key,
    canCheck: true,
    checked: theme === key,
    onClick: () => changeTheme(key)
  }));

  return (
    <ButtonComponent
      menuProps={{ shouldFocusOnMount: true, items: menuItems }}
      iconProps={{ iconName: 'Color' }}
    >
      {theme}
    </ButtonComponent>
  );
}
