import React from 'react';
import { CommandBarButton } from '@fluentui/react';
import { useAuthentication } from '../../util/authentication';
import { useHistory } from 'react-router-dom';

export function UserMenu() {
  const { principal, logout } = useAuthentication();

  const history = useHistory();
  const menuProps = {
    shouldFocusOnMount: true,
    items: [
      {
        key: 'profile',
        text: 'Profile',
        iconProps: { iconName: 'PlayerSettings' },
        onClick: () => history.push('/profile')
      },
      {
        key: 'logout',
        text: 'Logout',
        iconProps: { iconName: 'SignOut' },
        onClick: logout
      }
    ]
  };

  return (
    <CommandBarButton
      menuProps={menuProps}
      iconProps={{ iconName: 'UserOptional' }}>
      {principal.username}
    </CommandBarButton>
  );
}
