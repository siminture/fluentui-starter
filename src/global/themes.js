import React from "react";
import {
  DefaultTheme,
  DarkTheme,
  TeamsTheme,
  WordTheme,
} from "@fluentui/theme-samples";
import { ThemeProvider, CommandBarButton } from "@fluentui/react";
import { useLocalStorage } from "react-use";

export const themes = {
  default: DefaultTheme,
  dark: DarkTheme,
  teams: TeamsTheme,
  word: WordTheme,
};

export const ThemeContext = React.createContext({
  theme: "dark",
  changeTheme: (name) => {},
});

export const useTheme = () => React.useContext(ThemeContext);

function ThemeConsumer({ children }) {
  const { theme } = useTheme();
  return <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>;
}

export function DynamicThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("theme", "default");

  const changeTheme = (name) => themes[name] && setTheme(name);
  const themeContextValue = { theme, changeTheme };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ThemeConsumer>{children}</ThemeConsumer>
    </ThemeContext.Provider>
  );
}

export function ThemeToggle({ as: ButtonComponent }) {
  const { theme, changeTheme } = useTheme();
  const menuItems = Object.keys(themes).map((key) => ({
    key,
    text: key,
    canCheck: true,
    checked: theme === key,
    onClick: () => changeTheme(key),
  }));

  return (
    <ButtonComponent
      menuProps={{ shouldFocusOnMount: true, items: menuItems }}
      iconProps={{ iconName: "Color" }}
    >
      {theme}
    </ButtonComponent>
  );
}

ThemeToggle.defaultProps = {
  as: CommandBarButton,
};
