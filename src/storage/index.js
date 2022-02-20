import useStorage from './useStorage';
import createStorageStateHook from './createStorageStateHook';

function useStorageLocal(key, initialValue) {
    return useStorage('local', key, initialValue);
}


function useStorageSync(key, initialValue) {
    return useStorage('sync', key, initialValue);
}


function createStorageStateHookLocal(key, initialValue) {
    return createStorageStateHook('local', key, initialValue);
}


function createStorageStateHookSync(key, initialValue) {
    return createStorageStateHook('sync', key, initialValue);
}

export {
    useStorageLocal,
    useStorageSync,
    createStorageStateHookLocal,
    createStorageStateHookSync,
};
