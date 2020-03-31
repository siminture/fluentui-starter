import React from 'react';
import {
  DefaultButton,
  PrimaryButton,
  Link,
  TextField,
  Stack,
  MessageBar,
  MessageBarType
} from '@fluentui/react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';

import useAuthentication from '../hooks/useAuthentication';

const demoUsers = [
  {
    username: 'simmy',
    password: '123456',
    roles: ['admin']
  },
  {
    username: 'admin',
    password: '123456',
    roles: ['admin']
  }
];

function authenticate({ username, password }) {
  const found = demoUsers.find(
    user => username.toLocaleLowerCase() === user.username
  );

  if (found && found.password === password) {
    return Promise.resolve({
      username: found.username,
      token: username + '_' + Math.random(),
      displayName: found.displayName,
      roles: found.roles
    });
  } else {
    return Promise.reject('错误的用户名或密码');
  }
}

function LoginForm() {
  const { isAuthenticated, principal, login, logout } = useAuthentication();

  const { handleSubmit, control, errors } = useForm({
    mode: 'onBlur'
  });
  const [error, setError] = React.useState();

  const onSubmit = values => {
    setError(null);
    authenticate(values)
      .then(identity => {
        login(identity);
        history.replace(from);
      })
      .catch(setError);
  };

  const handleLogout = () => {
    logout();
  };

  const getErrorMessage = name => {
    return errors[name] ? errors[name].message : null;
  };

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/dashboard' } };

  return (
    <Stack style={{ margin: '10em auto', width: '30em' }}>
      {!isAuthenticated && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>登录</h3>
          <Stack
            tokens={{
              childrenGap: '1em'
            }}>
            <Controller
              as={TextField}
              control={control}
              label="用户名"
              autoComplete="username"
              errorMessage={getErrorMessage('username')}
              autoFocus
              name="username"
              rules={{
                required: '用户名必须提供',
                minLength: { value: 3, message: '用户名不能少于3个字符' },
                maxLength: { value: 50, message: '用户名不能超过50个字符' }
              }}
            />

            <Controller
              as={
                <TextField
                  label="密码"
                  type="password"
                  autoComplete="current-password"
                  errorMessage={getErrorMessage('password')}
                />
              }
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: '密码必须提供',
                minLength: { value: 6, message: '密码不能少于6个字符' },
                maxLength: { value: 50, message: '密码不能超过50个字符' }
              }}
            />

            <Stack
              horizontal
              horizontalAlign="end"
              tokens={{
                childrenGap: '1em'
              }}>
              <Link>找回密码</Link>
              <PrimaryButton type="submit">登录</PrimaryButton>
            </Stack>
            {error && (
              <MessageBar
                messageBarType={MessageBarType.error}
                onDismiss={() => setError(null)}>
                {error}
              </MessageBar>
            )}
          </Stack>
        </form>
      )}

      {isAuthenticated && (
        <div>
          <h3>{principal.username} 您已登录，欢迎你！</h3>
          <DefaultButton onClick={handleLogout}>Logout</DefaultButton>
        </div>
      )}
    </Stack>
  );
}

export default LoginForm;
