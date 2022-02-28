import {useCallback, useEffect, useReducer, useState} from 'react';
import {storageLocal, storageSync} from './storage';

export default function useStorage(area, key, initialValue) {
    const storage = area === 'local' ? storageLocal : storageSync

    const [INIT_VAL] = useState(() => {
        return typeof initialValue === 'function' ? initialValue() : initialValue;
    });

    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            AREA: area,
            storageState: INIT_VAL,
            isPersistent: true,
            error: ''
        }
    )
    const {AREA, storageState, isPersistent, error} = state;

    useEffect(() => {
        storage.get(key, INIT_VAL)
            .then(res => {
                setState({storageState: res, isPersistent: true, error: ''});
            })
            .catch(error => {
                setState({isPersistent: false, error: error});
            });
    }, [key, INIT_VAL]);

    const updateValue = useCallback((newValue) => {
        const toStore = typeof newValue === 'function' ? newValue(storageState) : newValue;
        setState({storageState: toStore});
        storage.set(key, toStore)
            .then(() => {
                setState({isPersistent: true, error: ''});
            })
            .catch(error => {
                setState({isPersistent: false, error: error});
            });
    }, [key, storageState]);

    useEffect(() => {
        const onChange = (changes, areaName) => {
            if (areaName === AREA && key in changes) {
                setState({storageState: changes[key].newValue, isPersistent: true, error: ''});
            }
        };
        chrome.storage.onChanged.addListener(onChange);
        return () => {
            chrome.storage.onChanged.removeListener(onChange);
        };
    }, [AREA, key]);

    return [storageState, updateValue, isPersistent, error];
}
