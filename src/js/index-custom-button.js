import React from 'react';
import {render} from 'react-dom';

import CustomButton from '../components/CustomButton.js';

const customButton = document.getElementById('custom-button');
if (customButton !== null) {
    render(<CustomButton/>, customButton);
}
