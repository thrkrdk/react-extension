export const storageLocal = {
    get: (key, defaultValue) => {
        const keyObj = defaultValue === undefined ? key : {[key]: defaultValue};
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(keyObj, items => {
                const {lastError} = chrome.runtime;
                if (lastError) return reject(lastError);
                resolve(items[key]);
            });
        });
    }, set: (key, value) => {
        return new Promise((resolve, reject) => {
            chrome.storage.local.set({[key]: value}, () => {
                const {lastError} = chrome.runtime;
                lastError ? reject(lastError) : resolve();
            });
        });
    },
};

export const storageSync = {
    get: (key, defaultValue) => {
        const keyObj = defaultValue === undefined ? key : {[key]: defaultValue};
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(keyObj, items => {
                const {lastError} = chrome.runtime;
                if (lastError) return reject(lastError);
                resolve(items[key]);
            });
        });
    }, set: (key, value) => {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.set({[key]: value}, () => {
                const {lastError} = chrome.runtime;
                lastError ? reject(lastError) : resolve();
            });
        });
    },
};
