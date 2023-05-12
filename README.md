# 前端错误收集 sdk（基础版）

- 安装

```
yarn add c-monitor
or
npm install c-monitor

```

- ## 新增功能点

  - 支持主动上报自定义日志，参数如下

  ```typescript
  /**
   * 主动上报方法参数说明
   * params的值为：内置的js错误对象 || 自定义上报日志对象
   * 以下示例 伪代码，具体调用看文档下面的 三种引入方式
   */
  interface customParams {
    name: "custom_info";   // 自主上报日志name必填 custom_info
    message: string;       // 自主上报日志内容必填，且为字符串
    businessName?: string;  // 业务模块 名称
  }
  interface err {
    ......  // 内置的err对象不做参数说明
  }
  const data: customParams | err;
  CMonitor.notify(data);
  ```

- 支持 browser、umd、esm 三种方式引入使用

1. 在原生浏览器环境使用如下

```javascript
<script src="./前端错误收集sdk"></script>;

// 初始化
CMonitor.init({
  disable: 1, // 1 为启用， 0 为关闭
  appkey: "xxxxxxx", // app唯一标识
  uploadUrl: "http://xxx.xxx.xxx", // 上报到server端的接口地址，目前server没有提供上报接口，默认搭配封装浏览器，写入本地log文件中
});
```

2. 在 vue2 中使用如下

```javascript
import Vue from "vue";
import CMonitor from "前端错误收集sdk";

// 初始化
CMonitor.init({
  disable: process.env.NODE_ENV === "production" ? 1 : 0, // 1 为启用， 0 为关闭   （可选择生产环境才开启）
  appkey: "xxxxxxx", // app唯一标识
  uploadUrl: "http://xxx.xxx.xxx", // 上报到server端的接口地址，目前server没有提供上报接口，默认搭配封装浏览器，写入本地log文件中
});

Vue.config.errorHandler = function (err) {
  CMonitor.notify(err); // 主动上报函数
};
```

3. 在 vue3 中使用如下

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import CMonitor from "前端错误收集sdk";

const app = createApp(App);
// 初始化
CMonitor.init({
  disable: 1, // 1 为启用， 0 为关闭  （可选择生产环境才开启）
  appkey: "xxxxxxx", // app唯一标识
  uploadUrl: "http://xxx.xxx.xxx", // 上报到server端的接口地址，目前server没有提供上报接口，默认搭配封装浏览器，写入本地log文件中
});

app.config.errorHandler = (err) => {
  CMonitor.notify(err); // 主动上报函数
};

app.mount("#app");
```
