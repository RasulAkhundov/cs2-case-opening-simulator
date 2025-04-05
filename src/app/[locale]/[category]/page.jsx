import React from 'react';
import './style.scss';
import { notFound } from 'next/navigation';
import { categories } from '@/constants/categories';
import { getAllCrates, getAllSkins } from '@/utils/fetchers';
import Input from '@/components/Input';
import SingleCategory from '@/components/SingleCategory/SingleCategory';

export default async function Page({ params }) {
   const { locale, category } = params;
   console.log(locale, category);

   const validCategories = categories.map((c) => c.href);
   if (!validCategories.includes(category)) return notFound();

   let data = [];

   if (category === 'crates') {
      const crates = await getAllCrates();
      const filteredCrates = crates.filter((crate) => crate.contains.length !== 0);
      data = filteredCrates;
   } else if (category === 'skins') {
      const skins = await getAllSkins();
      const filteredSkins = skins.filter((skin) => skin.crates.length !== 0);
      data = filteredSkins;
   }

   return (
      <div className="main__container category__container">
         <div className="main__wrapper">
            <div className="title__wrapper">
               <h2 className="font">Counter-Strike 2 - Cases</h2>

               <Input />
            </div>

            <SingleCategory data={data} />
         </div>
      </div>
   )
}
