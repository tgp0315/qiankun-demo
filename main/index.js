// import "zone.js";
import {
  initGlobalState,
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  start,
} from "qiankun";
import "./index.less";

import render from "./render/ReactRender";

/**
 * 初始化应用（可选）
 */
render({ loading: true });

const loader = (loading) => render({ loading });

const apps = [
  {
    name: 'react15',
    entry: '//localhost:7102',
    container: '#subapp-viewport',
    loader,
    activeRule: '/react15',
  },
  {
    name: "react16",
    entry: "//localhost:7110",
    container: "#subapp-viewport",
    loader,
    activeRule: "/react16",
  },
  {
    name: 'vue',
    entry: "//localhost:7101",
    container: "#subapp-viewport",
    loader,
    activeRule: '/vue'
  },
  {
    name: 'vue3',
    entry: '//localhost:7108',
    container: '#subapp-viewport',
    loader,
    activeRule: '/vue3',
  },
];

registerMicroApps(apps, {
  beforeLoad: [
    (app) => {
      console.log("[LifeCycle] before load %c%s", "color: green;", app.name);
    },
  ],
  beforeMount: [
    (app) => {
      console.log("[LifeCycle] before mount %c%s", "color: green;", app.name);
    },
  ],
  afterUnmount: [
    (app) => {
      console.log("[LifeCycle] after unmount %c%s", "color: green;", app.name);
    },
  ],
});

const actions = initGlobalState({
  user: "qiankun",
});

actions.onGlobalStateChange((value, prev) =>
  console.log("[setGlobalState - master]:", value, prev)
);

actions.setGlobalState({
  ignore: "master",
  user: {
    name: "master",
  },
});
window.mainAppGlobalStateActions = actions


/**
 * 更新主应用state
 * @param {*} key
 * @param {*} state
 */
const setMainAppGlobalState = (key, state) => {
  //这里可以对上方的defaultState进行补充
  if (window.mainAppGlobalStateActions) {
    window.mainAppGlobalStateActions.setGlobalState({
      [key]: state,
    });
  }
}

// 设置默认进入的子应用
setDefaultMountApp("/react16");
// 启动应用
start();
// 第一个微应用 mount 后需要调用的方法，比如开启一些监控或者埋点脚本。
runAfterFirstMounted(() => console.log("[MainApp] first app mounted"))

setMainAppGlobalState('namespace', 'nsCode')
