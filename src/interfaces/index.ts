export interface errorMsg extends commonMsg {
  message?: string;
  stacktrace: string;
}
export interface resourceMsg extends commonMsg {
  outerHTML: string;
  src: string;
  tagName: string;
}
export interface httpMsg extends commonMsg {
  method: string;
  status: string | number;
  statusText: string;
  response: string;
  requestUrl: string;
}
export interface promiseMsg extends commonMsg {
  name: string;
}

export interface logMsg extends commonMsg {
  message: string;
  businessName?: string;
}
export interface parmas {
  appkey: string;
  disable: number;
  appVersion: string;
  details: details | null;
}
export interface ConfigParams {
  appkey: string;
  disable: number;
  uploadUrl?: string;
}
interface commonMsg {
  occurTime: number;
  title: string;
  url: string;
  userAgent: string;
}

interface details {
  type: string;
  data: errorMsg | resourceMsg | httpMsg | promiseMsg | logMsg;
}
