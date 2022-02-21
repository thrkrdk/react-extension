// google arama sayfasındaki klayve butonunu buluyoruz ve gelen listeden gelen elementin önüne
// kendi div elementini oluşturuyoruz.
const container = document.getElementsByClassName('Umvnrc'); // bir elemanlı bir liste gelecek
for (const item of container) {
    const custom_button_elm = document.createElement('div');
    custom_button_elm.style = 'flex: 1 0 auto; display: flex; cursor: pointer;align-items: center;border: 0;background: transparent;outline: none;padding: 0 8px;width: 24px; line-height: 44px;';
    custom_button_elm.id = 'custom-button'; // div elementin  id değeri

    let buttonJs_script = document.createElement('script'); // google arama sayfasına button js dosyasını eklemek için script tag'ini oluşturuyoruz.
    buttonJs_script.src = 'custom_button.bundle.js'; //webpack ile oluşturulan dosyası button sayfasına script tagine ekliyoruz

    custom_button_elm.appendChild(buttonJs_script); // js dosyasını elemente ekliyoruz.

    item.before(custom_button_elm); // elementi sayfaya ekliyoruz
}



