export function queryString(obj: object): string {
  return encodeURIComponent(JSON.stringify(obj));
}

export function replaceAddEventListener() {
  const originAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    const wrappedListener = function (...args: any[]) {
      try {
        return (listener as any).apply(this, args);
      } catch (err) {
        throw err;
      }
    };
    return originAddEventListener.call(this, type, wrappedListener, options);
  };
}

export function isObject(obj: object): boolean {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
