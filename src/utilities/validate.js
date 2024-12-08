export function deXSS(input) {
  return input.replace(/<script.*?>.*?<\/script>/gi, "").replace(/[<>'"]/g, "");
}
  
  export function saneAndValidCommon(input) {
    return input && typeof input === "string" && input.length >= 3 && input.length <= 100;
  }
  
  export function saneAndValidKey(key) {
    return /^[a-zA-Z0-9_-]{1,64}$/.test(key);
  }
  
  export function saneAndValidValue(value) {
    return /^[a-zA-Z0-9_-]{1,256}$/.test(value);
  }