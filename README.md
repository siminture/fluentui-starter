## A Fluent UI Starter for Admin Application

### Features
* Configurable Route based on react-router-dom
* Authentication Component and Login Page based on react-hook-form
* Sidebar Layout, the nav items read from routeConfig
* Dark Theme

### Demo users
* admin/admin
* demo/demo

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
        isPublic: true, // no need to authenticate
        isHidden: true, // hide in sidebar
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
      // ...etc
    ]
  },
  null,
  pathGenerator
);

```

### Screenshots


#### Login page

![Login Page](https://github.com/siminture/fluentui-starter/blob/master/screenshots/login.PNG)

![Login Page Dark](https://github.com/siminture/fluentui-starter/blob/master/screenshots/login_dark.PNG)


#### Sidebar Layout

![Dashboard](https://github.com/siminture/fluentui-starter/blob/master/screenshots/dashboard.PNG)

![Dashboard Dark](https://github.com/siminture/fluentui-starter/blob/master/screenshots/dashboard_dark.PNG)

![PurchaseOrder](https://github.com/siminture/fluentui-starter/blob/master/screenshots/purchaseOrder.PNG)
