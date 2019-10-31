import React from 'react';
import './Footer.scss';

const creditText = ' כל הזכויות שמורות לעמית שוורץ';
export default () => (
    <footer className='site-footer'>
        <span>&#9400;{' '}{creditText}</span>
    </footer>
)