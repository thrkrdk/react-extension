import React from 'react'
import {useSearchStore, useSetttingsStore} from '../js/useStore';

const CustomButton = () => {
    const [searchHistory, setSearchHistory] = useSearchStore(); // kullanıcının arama geçmişini kaydedeceği stote bilgsini alıyoruz.
    const [settings] = useSetttingsStore();

    const save = () => {
        setSearchHistory(prevState => {
            let hist = searchHistory.history;
            const url = document.URL;
            let searchVal;
            for (const search of document.getElementsByClassName('gLFyf gsfi')) { // gogle bu classı değiştirirse bu değer alınayacak. bu kısmın güncellenmesi gerekir.
                searchVal = search.value; // kullanıcın aramış olduğu değeri alıyoruz.
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
