import React from 'react';
import {useSearchStore} from '../js/useStore';
import '../styles/style.css'

const Popup = () => {
    const [searchHistory, setSearchHistory, isPersistent, error] = useSearchStore();
    console.log(document.title);

    return (<div style={styles.main}>
        <h1>Search History</h1>
        <ul>
            {searchHistory.history.map((sh, index) => (
                <li>
                    <a href={sh.url} target="_blank">{sh.searchVal}</a>
                </li>
            ))}

        </ul>

    </div>);
}

const styles = {
    main: {
        width: '300px', height: '600px'
    }
}

export default Popup;
