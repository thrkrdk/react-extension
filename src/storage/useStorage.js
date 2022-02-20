import {useCallback, useEffect, useState} from 'react';
import {storageLocal, storageSync} from './storage';


export default function useStorage(area, key, initialValue) {
    const storage = area === 'local' ? storageLocal : storageSync

    const [AREA] = useState(area);

    const [INIT_VAL] = useState(() => {
        return typeof initialValue === 'function' ? initialValue() : initialValue;
    });

    const [state, setState] = useState(INIT_VAL);
    const [isPersisted, setIsPersisted] = useState(true); //persisted özelliği ile girilen verilerin gizli pencerede de görüntülenmesini sağlıyoruz.
    const [error, setError] = useState('');

    useEffect(() => {
        storage.get(key, INIT_VAL)
            .then(res => {
                setState(res);
                setIsPersisted(true);
                setError('');
            })
            .catch(error => {
                setIsPersisted(false);
                setError(error);
            });
    }, [key, INIT_VAL]);

    const updateValue = useCallback((newValue) => {
        const toStore = typeof newValue === 'function' ? newValue(state) : newValue;
        setState(toStore);
        storage.set(key, toStore)
            .then(() => {
                setIsPersisted(true);
                setError('');
            })
            .catch(error => {
                setIsPersisted(false);
                setError(error);
            });
    }, [key, state]);

    useEffect(() => {
        const onChange = (changes, areaName) => {
            if (areaName === AREA && key in changes) {
                setState(changes[key].newValue);
                setIsPersisted(true);
                setError('');
            }
        };
        chrome.storage.onChanged.addListener(onChange); // chrome.storage api'yi değişiklikleri dinlemesi için ekliyoruz
        return () => {
            chrome.storage.onChanged.removeListener(onChange); // Bigliler storage'yazıldıktan sonra listener'ı kaldıryoruzç
        };
    }, [AREA, key]);

    return [state, updateValue, isPersisted, error];
}
