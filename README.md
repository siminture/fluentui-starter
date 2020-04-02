## A Fluent UI Starter for Admin Application

### Configurated Routes based on react-router-dom
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

### Login Page based on react-hook-form

![Login Page](https://github.com/siminture/fluentui-starter/blob/master/login.PNG)

### Sidebar Layout

. Sidebar read data from routeConfig
![Sidebar Layout](https://github.com/siminture/fluentui-starter/blob/master/dashboard.PNG)

