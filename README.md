## A Fluent UI Starter for Admin Application

### Features
* Configurable Route based on react-router-dom
* Authentication Component and Login Page based on react-hook-form
* Sidebar Layout, the nav items read from routeConfig

### Route Config
```javascript
const routeConfig = hierarchize(
  {
    key: 'home',
    name: 'Home',
    icon: 'Home',
    path: '/',
    component: React.lazy(() => import('./pages/dashboard')),
    children: [
      {
        key: 'login',
        name: 'Login',
        isPublic: true,
        isHidden: true,
        component: React.lazy(() => import('./pages/Login'))
      },
      {
        key: 'order',
        name: 'Order',
        icon: 'visualizeApp',
        children: [
          {
            key: 'purchase-order',
            name: 'Purchase Order',
            component: React.lazy(() => import('./pages/order/purchase'))
          },
          {
            key: 'sales-order',
            name: 'Sales Order'
          }
        ]
      },
      {
        key: 'mangement',
        name: 'System Management',
        icon: 'managementApp',
        children: [
          {
            key: 'organization',
            name: 'Organization',
            icon: 'Org'
          },
          {
            key: 'user',
            name: 'User',
            icon: 'People'
          },
          {
            key: 'authority',
            name: 'Authority',
            icon: 'SecurityGroup'
          },
          {
            key: 'settings',
            name: 'Settings',
            icon: 'Settings',
            children:[
              {
                key: 'list',
                name: 'List',
              },
              {
                key: 'unit',
                name: 'Unit',
              }
            ]
          }
        ]
      }
    ]
  },
  null,
  pathGenerator
);

```
#### Login page

![Login Page](https://github.com/siminture/fluentui-starter/blob/master/login.PNG)

#### Sidebar Layout

![Sidebar Layout](https://github.com/siminture/fluentui-starter/blob/master/dashboard.PNG)

