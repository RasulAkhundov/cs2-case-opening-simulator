'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Langs from '@/constants/langs.json';
import { useTranslation } from 'react-i18next';
import '@/utils/lang/i18n';
import { useParams, usePathname } from 'next/navigation';

export default function NavbarLanguageSelector() {
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef(null);
   const params = useParams();
   const pathname = usePathname();  
   const locale = params?.locale || 'en';
   const { i18n } = useTranslation();

   const changeLanguage = (lang) => {
      i18n.changeLanguage(lang);
      const pathParts = pathname.split('/');
      pathParts[1] = lang;
      const newPath = pathParts.join('/');
    
      window.location.href = newPath;
    };

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
         }
      };

      document.addEventListener('click', handleClickOutside);
      return () => {
         document.removeEventListener('click', handleClickOutside);
      };
   }, []);

   return (
      <div className="lang__block" ref={dropdownRef}>
         <div className="selected-lang__wrapper" onClick={() => setIsOpen(!isOpen)}>
            <Image
               src={`/images/flags/${locale}.png`}
               alt='lang'
               width={48}
               height={48}
               quality={100}
               priority
            />
         </div>

         <div className={`langs-select__wrapper ${isOpen ? 'open' : ''}`}>
            {Langs.map((lang, i) => (
               <div className={`single-select__item ${lang.id === locale && 'current-lang__item'}`} key={i} onClick={() => changeLanguage(lang.id)}>
                  <Image
                     src={`/images/flags/${lang.id}.png`}
                     alt='lang'
                     width={48}
                     height={48}
                     quality={100}
                     priority
                  />

                  <span className='font'>{lang.name}</span>

                  {
                     lang.id === locale && (
                        <Image
                           src={'/images/selected.png'}
                           alt='selected'
                           width={32}
                           height={32}
                           quality={100}
                           className='selected-lang__icon'
                        />
                     )
                  }
               </div>
            ))}
         </div>
      </div>
   )
}