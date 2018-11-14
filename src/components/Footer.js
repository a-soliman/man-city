import React from 'react';
import { CityLogo } from './ui/icons';

const Footer = () => (
    <footer className='bck_blue'>
        <div className='footer_logo'>
            <CityLogo 
                width='70px' 
                height='70px'
                link={true}
                linkTo='/' />
        </div>

        <div className='footer_discl'>
            &copy; Man City 2018.
        </div>
    </footer>
);

export default Footer;