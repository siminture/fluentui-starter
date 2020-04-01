import React from 'react';
import {
  Stack,
  Persona,
  PersonaSize,
  IconButton,
  styled,
  classNamesFunction
} from '@fluentui/react';
import { useAuthentication } from '../authentication';

const getStyles = ({ theme }) => {
  return {
    root: {
      borderBottomStyle: 'solid',
      borderBottomColor: theme.palette.neutralLight,
      borderBottomWidth: 1,
      padding: theme.spacing.s1
    }
  };
};

const getClassNames = classNamesFunction();

function TopMenu({ styles, theme }) {
  const { principal, logout } = useAuthentication();
  const classNames = getClassNames(styles, { theme });
  return (
    <Stack horizontal horizontalAlign="end" className={classNames.root}>
      <Persona text={principal.username} size={PersonaSize.size32} />
      <IconButton
        iconProps={{ iconName: 'SignOut' }}
        onClick={logout}
        title="Logout"
      />
    </Stack>
  );
}

export default styled(TopMenu, getStyles);
