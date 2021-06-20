import React from "react";
import {
  classNamesFunction,
  DefaultButton,
  Link,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Stack,
  styled,
  TextField,
} from "@fluentui/react";
import { get } from "lodash";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { ThemeToggle } from "global/themes";
import { useAuthentication } from "global/authentication";

const demoUsers = [
  {
    username: "admin",
    password: "admin",
    roles: ["admin"],
  },
  {
    username: "demo",
    password: "demo",
    roles: ["user"],
  },
];

const getClassNames = classNamesFunction();

function LoginForm({ theme, styles }) {
  const { isAuthenticated, principal, login, logout } = useAuthentication();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [error, setError] = React.useState();
  const history = useHistory();
  const location = useLocation();

  const from = location.state?.from || { pathname: "/" };

  function onSubmit(values) {
    setError(null);
    remoteAuthService(values)
      .then((identity) => {
        login(identity);
        history.replace(from);
      })
      .catch(setError);
  }

  function getErrorMessage(name) {
    return get(errors, name + ".message");
  }

  const classNames = getClassNames(styles, { theme });
  return (
    <Stack className={classNames.root}>
      {isAuthenticated && (
        <Stack tokens={{ childrenGap: "1em" }}>
          <h3 className={classNames.title}>
            {principal.username}, you are already signed in.
          </h3>
          <Stack horizontal tokens={{ childrenGap: "1em" }}>
            <PrimaryButton
              onClick={() => history.push("/")}
              iconProps={{ iconName: "Home" }}
            >
              Go to Home
            </PrimaryButton>
            <DefaultButton onClick={logout} iconProps={{ iconName: "SignOut" }}>
              Logout
            </DefaultButton>
          </Stack>
        </Stack>
      )}

      {!isAuthenticated && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack horizontal horizontalAlign="end" verticalAlign="center">
            <ThemeToggle as={DefaultButton} />
          </Stack>
          <h3 className={classNames.title}>Login</h3>
          <Stack
            tokens={{
              childrenGap: "1em",
            }}
          >
            <Controller
              as={TextField}
              control={control}
              autoComplete="username"
              autoFocus
              minLength={3}
              maxLength={32}
              defaultValue=""
              name="username"
              rules={{
                required: "Please enter your username",
                minLength: {
                  value: 3,
                  message: "Please enter your username",
                },
                maxLength: { value: 32, message: "Username is too long" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  errorMessage={getErrorMessage("username")}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              minLength={4}
              maxLength={64}
              rules={{
                required: "Please enter your password",
                minLength: {
                  value: 4,
                  message: "Please enter your password",
                },
                maxLength: { value: 64, message: "Password is too long" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  errorMessage={getErrorMessage("password")}
                />
              )}
            />

            <Stack
              horizontal
              horizontalAlign="end"
              tokens={{ childrenGap: "1em" }}
            >
              <Link>Find my password</Link>
              <PrimaryButton type="submit">Login</PrimaryButton>
            </Stack>
            <Stack>
              <h3>Demo users</h3>
              <ui>
                <li>demo/demo</li>
                <li>admin/admin</li>
              </ui>
            </Stack>
            {error && (
              <MessageBar
                messageBarType={MessageBarType.error}
                onDismiss={() => setError(null)}
              >
                {error}
              </MessageBar>
            )}
          </Stack>
        </form>
      )}
    </Stack>
  );
}

function remoteAuthService({ username, password }) {
  const found = demoUsers.find(
    (user) => username.toLocaleLowerCase() === user.username
  );

  if (found?.password === password) {
    return Promise.resolve({
      username: found.username,
      token: username + "_" + Math.random(),
      displayName: found.displayName,
      roles: found.roles,
    });
  } else {
    return Promise.reject("Incorrect username or password");
  }
}

function getStyles({ theme }) {
  return {
    root: {
      margin: "10em auto",
      width: "30em",
      backgroundColor: theme.palette.neutralLighter,
      padding: theme.spacing.l2,
      borderRadius: theme.effects.roundedCorner2,
    },
    title: {
      ...theme.fonts.xLargePlus,
      marginTop: 0,
    },
  };
}

export default styled(LoginForm, getStyles);
