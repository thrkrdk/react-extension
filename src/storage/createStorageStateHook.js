import {useCallback, useEffect} from 'react';
import useStorage from './useStorage';


export default function createStorageStateHook(area, key, initVal) {
    const consumers = [];

    return function useCreateStorageHook() {
        const [value, setValue, isPersisted, error] = useStorage(area, key, initVal);

        const setVals = useCallback(newValue => {
            for (const consumer of consumers) {
                consumer(newValue);
            }
        }, []);

        useEffect(() => {
            consumers.push(setValue);
            return () => {
                consumers.splice(consumers.indexOf(setValue), 1);
            };
        }, [setValue]);

        return [value, setVals, isPersisted, error];
    };
}
