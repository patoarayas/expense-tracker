export function dateStringToDate(str: string, separator: string = "/"): Date {
  const dateParts = str.split(separator);
  // month is 0-based, that's why we need dataParts[1] - 1
  return new Date(+dateParts[2], parseInt(dateParts[1]) - 1, +dateParts[0]);
}

export function setLocalStorage(key : string, value: any) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // catch possible errors:
      // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    }
  }
  
export function getLocalStorage(key: string, initialValue: any) {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      // if error, return initial value
      return initialValue;
    }
  }