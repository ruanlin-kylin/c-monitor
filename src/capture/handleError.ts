import { parmas } from "../interfaces/index";
import { USER_CONFIG } from "../config/index";
export default function handleErr(error: any, type: string): void {
  let msg: parmas = {
    appkey: USER_CONFIG.appkey,
    disable: USER_CONFIG.disable,
    appVersion: "1.0.1",
    details: null,
  };
  if (!!msg.disable) {
    switch (type) {
      case "resourceError":
        reportResourceError(msg, error);
        break;
      case "httpError":
        reportHttpError(msg, error);
        break;
      case "caught":
        reportCaughtError(msg, error);
        break;
      case "promise":
        reportPromiseError(msg, error);
        break;
      case "message":
        reportMessageLog(msg, error);
    }
  }
}

// 封装浏览器环境上报错误到本地文件
function reportWebViewLog(msg: parmas): void {
  const _window = window as any;
  const webview = _window.chrome?.webview;
  const webviewMsg = { exec: "console", data: { msg } };
  // console.log("前端日志上报 : ", msg);
  if (webview) webview.postMessage(webviewMsg);
}

function reportResourceError(msg: parmas, data: any): void {
  msg.details = {
    type: "resourceError",
    data: {
      outerHTML: data.outerHTML,
      message: data.message,
      src: data.src,
      tagName: data.localName?.toUpperCase(),
      occurTime: new Date().getTime(),
      title: document.title,
      url: window.location.href,
      userAgent: window.navigator.userAgent,
    },
  };

  // console.log("resourceError :", msg);
  reportWebViewLog(msg);
  //   new Image().src = `${Config.uploadUrl}?commit=${queryString(msg)}`;
}
function reportHttpError(msg: parmas, data: any): void {
  msg.details = {
    type: "httpError",
    data: {
      occurTime: new Date().getTime(),
      title: document.title,
      url: window.location.href,
      userAgent: window.navigator.userAgent,
      method: data.method ? data.method : "GET",
      status: data.status,
      statusText: data.statusText,
      response: data.response,
      requestUrl: data.url || data.requestUrl,
    },
  };
  // console.log(msg);
  reportWebViewLog(msg);
  //   new Image().src = `${Config.uploadUrl}?commit=${queryString(msg)}`;
}
function reportCaughtError(msg: parmas, data: any): void {
  msg.details = {
    type: "caughtError",
    data: {
      occurTime: new Date().getTime(),
      title: document.title,
      url: window.location.href,
      userAgent: window.navigator.userAgent,
      stacktrace: data.stack,
    },
  };
  // console.log(msg);
  reportWebViewLog(msg);
  //   new Image().src = `${Config.uploadUrl}?commit=${queryString(msg)}`;
}
function reportPromiseError(msg: parmas, data: any): void {
  msg.details = {
    type: "promiseError",
    data: {
      occurTime: new Date().getTime(),
      title: document.title,
      url: window.location.href,
      userAgent: window.navigator.userAgent,
      stacktrace: data.stack,
      name: "unhandledrejection",
    },
  };
  // console.log(msg);
  reportWebViewLog(msg);
  //   new Image().src = `${Config.uploadUrl}?commit=${queryString(msg)}`;
}
function reportMessageLog(msg: parmas, data: any): void {
  msg.details = {
    type: "message",
    data: {
      occurTime: new Date().getTime(),
      title: document.title,
      url: window.location.href,
      userAgent: window.navigator.userAgent,
      message: data.message,
      businessName: data.businessName,
    },
  };
  reportWebViewLog(msg);
}
