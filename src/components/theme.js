import React from 'react';
import { Fabric, Customizer } from '@fluentui/react';
import { useLocalStorage } from 'react-use';

import {
  DefaultCustomizations,
  DarkCustomizations
} from '@uifabric/theme-samples';

export const ThemeList = {
  light: DefaultCustomizations,
  dark: DarkCustomizations
};

export const ThemeContext = React.createContext({
  theme: 'light',
  changeTheme: name => {}
});

const ThemeWrapper = ({ children }) => {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <Customizer {...ThemeList[theme]}>
          <Fabric>{children}</Fabric>
        </Customizer>
      )}
    </ThemeContext.Consumer>
  );
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('themes', 'dark');
  const changeTheme = name => ThemeList[name] && setTheme(name);
  const value = { theme, changeTheme };
  return (
    <ThemeContext.Provider value={value}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);
