import React from 'react'
import {useSearchStore, useSetttingsStore} from '../js/useStore';

const CustomButton = () => {
    const [searchHistory, setSearchHistory] = useSearchStore();
    const [settings] = useSetttingsStore();

    const save = () => {
        setSearchHistory(prevState => {
            let hist = searchHistory.history;
            const url = document.URL;
            let searchVal;
            for (const search of document.getElementsByClassName('gLFyf gsfi')) {
                searchVal = search.value;
            }
            hist = [...hist, {searchVal, url}]
            return {
                ...prevState, history: hist,
            };
        });
    }

    return (<button type="button" style={{...styles.button, ...settings.buttonStyle}} onClick={save}>
        {settings.buttonText}
    </button>)
}

const styles = {
    button: {
        border: 'none',
        padding: '6px 8px 5px 5px',
        textAlign: 'center',
        textDecoration: 'none',
        fontSize: '16px',
        margin: '2px 2px',
        cursor: 'pointer',
    }
}

export default CustomButton;
