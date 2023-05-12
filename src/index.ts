import captureError from "./capture/captureError";
import handleErr from "./capture/handleError";
import { ConfigParams } from "./interfaces";
import { USER_CONFIG } from "./config";
// import { replaceAddEventListener } from "./util";
class CMonitor {
  constructor(options: ConfigParams) {
    const { appkey, disable, uploadUrl } = options;
    USER_CONFIG.appkey = appkey;
    USER_CONFIG.disable = disable; // 是否上报： 默认为 1 上报， 0 不上报
    USER_CONFIG.uploadUrl = uploadUrl; // 错误上报地址

    captureError();
  }
  static notify(error: any) {
    let errName: string = error.name;
    if (!errName) return;
    let errMsg: string = error.message;
    let type: string = "caught";
    if (errMsg) {
      if (errName == "custom_info") {
        type = "message";
      } else {
        type = errName.indexOf("http") != -1 ? "httpError" : "caught";
      }
    }
    handleErr(error, type);
  }
}

function init(options: ConfigParams) {
  new CMonitor(options);
}

function notify(error: any) {
  CMonitor.notify(error);
}

export default { init, notify };
