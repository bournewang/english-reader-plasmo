export type StorageValue = string | number | boolean | Record<string, unknown> | null;

interface StorageInterface {
  setItem(key: string, value: StorageValue): Promise<void>;
  getItem<T extends StorageValue>(key: string): Promise<T | null>;
  removeItem(key: string): Promise<void>;
}

// declare const chrome: any;

const chromeStorage: StorageInterface = {
  setItem: (key: string, value: StorageValue) => {
    return new Promise<void>((resolve, reject) => {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.set({ [key]: value }, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } else {
        reject(new Error('Chrome storage is not available'));
      }
    });
  },
  getItem: <T extends StorageValue>(key: string) => {
    return new Promise<T | null>((resolve, reject) => {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.get([key], (result: Record<string, T>) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(result[key] || null);
          }
        });
      } else {
        reject(new Error('Chrome storage is not available'));
      }
    });
  },
  removeItem: (key: string) => {
    return new Promise<void>((resolve, reject) => {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.remove([key], () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } else {
        reject(new Error('Chrome storage is not available'));
      }
    });
  }
};

const localStorage: StorageInterface = {
  setItem: (key: string, value: StorageValue) => {
    return new Promise<void>((resolve) => {
      window.localStorage.setItem(key, JSON.stringify(value));
      resolve();
    });
  },
  getItem: <T extends StorageValue>(key: string) => {
    return new Promise<T | null>((resolve) => {
      const value = window.localStorage.getItem(key);
      resolve(value ? (JSON.parse(value) as T) : null);
    });
  },
  removeItem: (key: string) => {
    return new Promise<void>((resolve) => {
      window.localStorage.removeItem(key);
      resolve();
    });
  }
};

const getStorage = (): StorageInterface => {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    return chromeStorage;
  }
  return localStorage;
};

export default getStorage;