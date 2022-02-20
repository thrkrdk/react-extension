import React from 'react';
import {useSetttingsStore} from '../js/useStore';
import '../styles/style.css'

const Options = () => {
    const [settings, setSettings] = useSetttingsStore();
    const changeButtonName = event => {
        setSettings(prevState => {
            console.log(event.target.value);
            return {
                ...prevState, buttonText: event.target.value
            };
        });
    };

    const changeButtonColor = event => {
        setSettings(prevState => {
            return {
                ...prevState, buttonStyle: {...settings.buttonStyle, backgroundColor: event.target.value}
            };
        });
    };

    const changeButtonFontColor = event => {
        setSettings(prevState => {
            return {
                ...prevState, buttonStyle: {...settings.buttonStyle, color: event.target.value}
            };
        });
    };
    return (<div>
        <label>
            <span>Button Text: </span>
            <input
                type="text"
                name="buttonText"
                value={settings.buttonText}
                onChange={changeButtonName}
            />
        </label>
        <label>
            <span>Button Color: </span>
            <input
                type="color"
                name="buttonColor"
                value={settings.buttonStyle.backgroundColor}
                onChange={changeButtonColor}
            />
        </label>
        <label>
            <span>Button Text: </span>
            <input
                type="color"
                name="buttonFontColor"
                value={settings.buttonStyle.color}
                onChange={changeButtonFontColor}
            />
        </label>
    </div>);
}


export default Options;
