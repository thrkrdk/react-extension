import {useCallback, useEffect, useState} from 'react';
import {storageLocal, storageSync} from './storage';

export default function useStorage(area, key, initialValue) {
    const storage = area === 'local' ? storageLocal : storageSync

    const [AREA] = useState(area);

    const [INIT_VAL] = useState(() => {
        return typeof initialValue === 'function' ? initialValue() : initialValue;
    });


    const [state, setState] = useState(INIT_VAL);
    const [isPersistent, setIsPersistent] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        storage.get(key, INIT_VAL)
            .then(res => {
                setState(res);
                setIsPersistent(true);
                setError('');
            })
            .catch(error => {
                setIsPersistent(false);
                setError(error);
            });
    }, [key, INIT_VAL]);

    const updateValue = useCallback((newValue) => {
        const toStore = typeof newValue === 'function' ? newValue(state) : newValue;
        setState(toStore);
        storage.set(key, toStore)
            .then(() => {
                setIsPersistent(true);
                setError('');
            })
            .catch(error => {
                setIsPersistent(false);
                setError(error);
            });
    }, [key, state]);

    useEffect(() => {
        const onChange = (changes, areaName) => {
            if (areaName === AREA && key in changes) {
                setState(changes[key].newValue);
                setIsPersistent(true);
                setError('');
            }
        };
        chrome.storage.onChanged.addListener(onChange);
        return () => {
            chrome.storage.onChanged.removeListener(onChange);
        };
    }, [AREA, key]);

    return [state, updateValue, isPersistent, error];
}
