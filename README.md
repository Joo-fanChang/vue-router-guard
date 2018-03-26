# vue-template

> 一个vue + koa后台demo

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9016
npm run dev
npm run server

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 说明
主页为 /desk/public 无权限
管理员权限 为/desk/admin
无权限时跳转到/login页面

其中登录成功后，将token存在vuex中
在router跳转前，判断是否有token并且在有效期内，这是前端的控制

为了测试跳转，登录的有效限是10s

但是权限问题，前端控制是很不靠谱的

修改axios的拦截器，发送接口都在headers中带上token，后台判断如果没有的话，就直接401
后台处理的话，/desk/public 这样的公共权限是没有进行过滤的

