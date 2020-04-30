# 工程名


### 1. 业务简介
待补充...

### 2. 技术栈

- [react native](https://reactnative.dev/docs/getting-started)

简而言之：rn对原生（android/ios）api再作了一次抽象供js调用，调用形式和reactjs保持一致。

- [react navigation](https://reactnavigation.org/docs/getting-started)

react navigation是rn的第三方组件（当然也是对原生api的抽象），类似于浏览器端的react-router，主要用于管理页面和导航（头部导航、tab导航、抽屉式导航等）

- [redux](https://redux.js.org/introduction/getting-started)

- [react-redux](https://react-redux.js.org/introduction/quick-start)

- [redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware)



### 3. 架构设计

<img src="https://p1.music.126.net/9NvTJ9sQjYIPDTuX5eYe5Q==/109951164902790513.jpg" width="800" />

从下至上：
1. components包括rn的core component、社区的community component以及自定义的custom component，用于显示数据，它们实质上都是通过rn的jsBridge对原生api的再次抽象。
2. container作为component的容器，负责与redux、service通信，获取、保存、加工数据。
3. react-navigation用于导航和管理页面（container）

### 4. 开发指南

##### 4.1 开发方式
使用android模拟器进行开发和调试，原因基于以下考虑
- 相对ios，android的环境搭建更加轻量（android studio + 环境配置）
- 相对使用react-native-web在浏览器里开发，直接在android模拟器里开发兼容性更好，无需进行组件mock和兼容，且更加接近真机。
- rn可以根据package.json自动关联native组件对应的android端依赖，使得开发比较高效
- 调试还算方便，command + m即可唤起chrome调试器
- java代码更容易看懂和掌握，可以方便写三方组件的原生代码，ios端直接交给ios的同事搞定


##### 4.2 android模拟器环境搭建（mac系统，只有简单的4步）

###### 1. 步骤一 安装watchman

<img src="https://p1.music.126.net/BbyfBrGIajOf0yqkNKxcRA==/109951164901018319.jpg" width="600" />

watchman是facebook推出的用于监听文件改变的工具，这里应该是用于在开发过程中监听文件变化并重新打包加载

###### 2. 步骤二 安装JDK（Java Development Kit，系统已经有JDK 8(JDK1.8)了就跳过此步）

<img src="https://p1.music.126.net/wtXUYwtw_2R_mjsH02tHjg==/109951164901066992.jpg" width="600" />

android是java编写的，运行就需要java的运行环境。

###### 附：如何查看系统是否安装了JDK8（JDK1.8）

<img src="https://p1.music.126.net/cKjBmPXdCvmG_XivwiYMAg==/109951164902647081.jpg" width="400" />

###### 3. 步骤三 安装 Android Studio 安卓开发IDE(android的sdk及模拟器全靠它)

- [安装包下载地址](https://developer.android.com/studio/index.html) 700多M，相对xcode真是轻量多了。

- 安装类型选择"Custom",选中以下组件进行安装，结束后就进入欢迎界面了

    1.Android SDK

    2.Android SDK Platform

    3.Performance (Intel ® HAXM)

    4.Android Virtual Device
    
- 安装Android 9 (Pie) SDK

    android sudio默认安装了最新的android sdk（10），但是rn某些时候需要用到Android 9 (Pie) SDK，因此需要额外安装：
    
    1. Appearance & Behavior → System Settings → Android SDK
    2. 选择SDK Platforms这个Tab，然后勾选Android 9 (Pie)，勾选右下角的Show Package Details，把它展开，
    然后勾选Android SDK Platform 28、Intel x86 Atom_64 System Image、Google APIs Intel x86 Atom System Image
    3. 选择SDK Tools这个Tab，勾选右下角的Show Package Details，把它展开，然后勾选Android SDK Build-Tools 28.0.3版本
    4. 点击apply完成Android 9 (Pie) SDK的安装
    

###### 4.步骤四 配置shell的android环境变量
打开你的shell的配置文件，一般配置都在当前用户根目录下，以zsh为例，它的配置文件路径为 
<img src="https://p1.music.126.net/0AvUDp3xSBhF5JcpP3T2mA==/109951164901201912.jpg" width="150" />
    
然后添加以下环境变量
       
1. export ANDROID_HOME=$HOME/Library/Android/sdk
2. export PATH=$PATH:$ANDROID_HOME/emulator
3. export PATH=$PATH:$ANDROID_HOME/tools
4. export PATH=$PATH:$ANDROID_HOME/tools/bin
5. export PATH=$PATH:$ANDROID_HOME/platform-tools


至此，整个android模拟器环境搭建完毕

##### 4.3 开发步骤

1. clone 工程 git clone ssh://git@g.hz.netease.com:22222/cloudmusic-frontend/mosi-main.git
2. 进入工程，nenpm install
3. nenpm run start，rn会自动启动模拟器（安装android studio的时候会自动生成一个）和本地server(类似webpack-server，打包js供rn使用)，并且在模拟器里启动应用。因为要启动模拟器，首次启动可能有点慢，大概要耗时1-2分钟。
4. rn支持热更新（fast fresh），改代码之后会自动重新加载
5. 关闭shell（启动server的那个shell）即结束开发

##### 4.4 调试
应用启动成功在android模拟按command + M,跳出开发菜单，选择debug打开chrome debugger；选择toggle inspector检查元素

###### react-devtools（可选）
react-devtools有更加直观的结构展示和性能测试：npm install -g react-devtools，其实也可以不用全局安装，但是集成在工程里感觉又太重了。然后命令行输入react-devtools，开启调试器。

进入模拟器，command + M,react-devtools进入工作状态

<img src="https://p1.music.126.net/mfIG4jCykhQemKZUjrpwjw==/109951164902625185.jpg" width="600" />

##### 4.5 打包js（一般情况下本地无需打包，都是到静态部署系统上打包）
- android: 测试环境nenpm run build:android:test 线上环境nenpm run build:android
- ios: 测试环境nenpm run build:ios:test 线上环境nenpm run build:ios

##### 4.6 发布


##### 4.7 真机测试



##### 4.8 工程结构

<img src="https://p1.music.126.net/bhtE_gSatLmCg7gsPRuypw==/109951164902821888.jpg" width="200" />

- android： 使js能在android运行起来的app"壳"

- script： 打包的脚本（webpack那份配置文件先别管，暂时用不到）
- src： 工程源码
    - component： 公共显示组件
    - container： 容器组件/业务显示组件
    - redux：redux相关
    - service：服务相关
    - util：常量、工具等
- .babelrc：babel工程路径别名配置
- .commitlintrc/.eslintrc/.husckyrc/.stylelintrc:云音乐编码规范配置文件
- .watchmanconfig: watchman配置文件
- app.js： 应用主程序
- app.json： 应用名称，静态部署的rn模块名称需和它的name属性保持一致
- babel.config.js： babel配置文件
- index.android.js：android入口文件
- index.ios.js：ios入口文件
- jsconfig.json：装饰器配置
- metro.config.js：rn打包配置文件
- proxy.config.js：服务代理，cookie设置等
  

### 5. 开发规范

###### 5.1 分支规范

以jira id作为分支名，如：feature/MUSIC-12345

###### 5.2编码规范

[云音乐编码规范](http://npm.hz.netease.com/package/@music/elint-preset-base)

###### 5.3业务规范

1. 根据工程结构放置对应模块：
    - 公共显示组件放在component
    - 容器组件放在 container文件夹，如果容器组件用到不通用的业务显示组件，请将此放在container/xxxxxModule/component下
    - 服务相关放在service文件夹，根据实体分类
    - reudx相关放在redux文件夹
    - 常量、工具类放置在util下

2. 显示组件尽量保持只显示传递给它的数据，不要随意主动从外界获取数据，获取服数据的工作交给container组件。

3. 数据尽量不要使用双向绑定，这会导致意外改变数据，对排查问题造成困扰。

4. rn的样式和js分开两个文件写或者写在js的下面，这样的好处是更加聚焦js代码

###### 5.3最佳实践

1. 直接和native navigation关联的container组件，请确保用SafeAreaView包裹。因为手机刘海屏等需要设置安全区
```js
    import { SafeAreaView } from 'react-native-safe-area-context';
```

2. service的调用
通常情况下，请将远程调用以及相关服务类的功能写在service文件夹中，分类尽量与后端数据库对象保持一致（如user）

编写形式
```js
import Fetch from '../util/fetch';

const URL = {
    TEST: 'http://nei.hz.netease.com/api/apimock-v2/a131a749be500664711c4b0413f64e54/api/btfish/backend/obb/video/list',
};

export const test = param => Fetch(URL.TEST, {
    data: param
});

export default {};

```

3. redux的使用
 
为了保证业务路径结构简单，封装性好，code reivew 高效，一般情况下，建议只有在遇到数据深层传递、数据缓存、数据共享的情况下使用redux，
获取数据尽量直接走service。

编写形式：

以user为例

###### 步骤一：在redux文件下建立文件夹redux/user/index.js


```js
import reducerFactory from '../reducerFactory';

const SAY = 'app/home/test';

// Reducer
export const reducers = {
    [`${SAY}_FULFILLED`]: (state, { payload }) => {
        const words = payload.data;
        return {
            saidWords: words
        };
    }
};

// Action Creators
export const actions = {
    say: words => ({
        type: SAY,
        payload: new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: words
                });
            },
            500);
        })
    })
};

export default reducerFactory(reducers);
```

###### 步骤二 在redux/store.js引入user的reducer和action,...代表省略的代码

```js
import user, { actions as actionsUser } from './user';


const combinedActions = {
    ...
    user: actionsUser
};

...

export default createStore(combineReducers({
    ...
    user
}), applyMiddleware(...middlewares));

...

```

###### 步骤三 在container中进行绑定和使用

```js

...
import { connectByModule } from '../../redux/store';
...

// 第一个参数'user'如果设置为null，则在调用方法时需要加上模块空间 this.props.actions.user.say()
@connectByModule('user', state => ({
    saidWords: state.user.saidWords
}))
class Home extends React.PureComponent {
...
    componentDidMount = () => {
        this.props.actions.say('hello');
    }
    
    render() {
        const {
            saidWords
        } = this.props;
        return (<div>{saidWords}</div>)
    }
    
}

```
 
    




