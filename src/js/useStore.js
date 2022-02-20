import {createStorageStateHookLocal} from '../storage';

const SEARCH_KEY = 'searchHistory';
const SEARCH_INITIAL_VALUE = {
    history: [],
};

export const useSearchStore = createStorageStateHookLocal(SEARCH_KEY, SEARCH_INITIAL_VALUE);

const SETIINGS_KEY = 'settings';
const SETTINGS_INITIAL_VALUE = {
    buttonText: '(+)',
    buttonStyle: {
        backgroundColor: '#4CAF50',
        color: '#fff'
    }
};

export const useSetttingsStore = createStorageStateHookLocal(SETIINGS_KEY, SETTINGS_INITIAL_VALUE);
