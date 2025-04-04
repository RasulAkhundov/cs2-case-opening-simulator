import React from 'react';
import './navbar.scss';
import Image from 'next/image';
import NavbarLanguageSelector from '@/components/NavbarLanguageSelector';
import LocaleLink from '@/components/LocaleLink';

function Navbar() {

   return (
      <div className='navbar__wrapper'>
         <div className="navbar-inner__wrapper">
            <LocaleLink href={'/'}>
               <div className="logo__wrapper">
                  <Image src={'/images/logo/logo.png'} alt="logo" width={100} height={100} quality={100} priority />
                  <span className='font'>Counter-Strike 2</span>
               </div>
            </LocaleLink>

            <NavbarLanguageSelector />
         </div>
      </div>
   )
}

export default Navbar