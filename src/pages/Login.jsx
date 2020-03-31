import React from 'react';
import {
  DefaultButton,
  PrimaryButton,
  Link,
  TextField,
  Stack
} from '@fluentui/react';
import { useForm, Controller } from 'react-hook-form';
import useAuthentication from '../hooks/useAuthentication';

function LoginForm() {
  const { isAuthenticated, principal, login, logout } = useAuthentication();

  const { handleSubmit, control, errors } = useForm({
    mode: 'onBlur'
  });

  const onSubmit = data => {
    login({ username: data.username });
  };

  const handleLogout = () => {
    logout();
  };

  const getErrorMessage = name => {
    return errors[name] ? errors[name].message : null;
  };

  console.info(errors);

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
