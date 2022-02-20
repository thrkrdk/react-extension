const container = document.getElementsByClassName('Umvnrc'); // bir elemanlı bir liste gelecek
for (const item of container) {
    const custom_button_elm = document.createElement('div');
    custom_button_elm.style = 'flex: 1 0 auto; display: flex; cursor: pointer;align-items: center;border: 0;background: transparent;outline: none;padding: 0 8px;width: 24px; line-height: 44px;';
    let buttonJs_script = document.createElement('script');

    custom_button_elm.id = 'custom-button';
    buttonJs_script.src = 'custom_button.bundle.js';

    custom_button_elm.appendChild(buttonJs_script);

    item.before(custom_button_elm);
}



