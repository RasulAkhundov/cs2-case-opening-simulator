import React from 'react';
import './style.scss';
import { notFound } from 'next/navigation';
import { getAllCrates } from '@/lib/fetchers';
import Image from 'next/image';
import { getDropChance } from '@/utils/getDropChance';
import CaseOpening from '@/components/CaseOpening/CaseOpening';

export default async function page({ params }) {
   const { locale, category, slug } = params;

   const crates = await getAllCrates(locale);
   const data = crates.find((crate) => crate.id === slug);

   if (!data) return notFound();

   const contains = data.contains || [];
   console.log(data.contains_rare);

   const getTypeAndNameOfSkin = (name, index) => {
      if (index == 0) {
         const result = name.split(" | ")[0];
         return result;
      } else {
         const result = name.split(" | ")[1];
         return result;
      }
   }

   // Calculate numbers for skins rarity
   const rarityCounts = {};
   contains.forEach((skin) => {
      const rarity = skin.rarity?.name;
      if (!rarity) return;

      rarityCounts[rarity] = (rarityCounts[rarity] || 0) + 1;
   });

   return (
      <div className="main__container case-opening__container">
         <div className="main__wrapper">

            <div className="page-title__wrapper">
               <h2 className='font'>{data?.name}</h2>
            </div>
            
            <CaseOpening skins={contains} rareItem={data.contains_rare} />

            <div className="contains__wrapper">
               <div className="title__wrapper">
                  <h2 className='font'>CASE CONTENTS</h2>
               </div>

               <div className="container__grid">
                  {
                     contains && contains.map((skin, i) => {
                        const rarityName = skin.rarity?.name;
                        const countOfThatRarity = rarityCounts[rarityName];
                        const dropChance = getDropChance(rarityName, countOfThatRarity);

                        return (
                           <div className="skin__card" key={i}>

                              <div className="chance__wrapper">
                                 <h5 className='font'>CHANCE</h5>
                                 <span className='font'>{dropChance}%</span>
                              </div>

                              <div className="skin-image__wrapper">
                                 <Image
                                    src={skin.image}
                                    alt={skin.name}
                                    width={200}
                                    height={200}
                                    quality={100}
                                    draggable={false}
                                 />
                              </div>

                              <div className="skin__info">
                                 <h3 className="font skin__type">{getTypeAndNameOfSkin(skin.name, 0)}</h3>
                                 <span className="font skin__name">{getTypeAndNameOfSkin(skin.name, 1)}</span>
                              </div>

                              <div className="skin__rarity">
                                 <div className="line" style={{ background: skin.rarity.color }}></div>
                              </div>
                           </div>
                        )
                     })
                  }

                  {
                     (data?.contains_rare.length > 0 && data?.loot_list !== null) ? (
                        <div className="skin__card">

                           <div className="chance__wrapper">
                              <h5 className='font'>CHANCE</h5>
                              <span className='font'>0.260%</span>
                           </div>

                           <div className="skin-image__wrapper">
                              <Image
                                 src={data.loot_list.image}
                                 alt={data.loot_list.name}
                                 width={200}
                                 height={200}
                                 quality={100}
                                 draggable={false}
                              />
                           </div>

                           <div className="skin__info">
                              <span className="font skin__name">{data.loot_list.name}</span>
                           </div>

                           <div className="skin__rarity">
                              <div className="line" style={{ background: "rgb(255, 215, 0)" }}></div>
                           </div>
                        </div>
                     ) : (data?.contains_rare.length > 0 && data?.loot_list === null) ? (
                        <div className="skin__card">

                           <div className="chance__wrapper">
                              <h5 className='font'>CHANCE</h5>
                              <span className='font'>0.260%</span>
                           </div>

                           <div className="skin-image__wrapper">
                              <Image
                                 src="/images/collections/special-item-img.png"
                                 alt="Special Item"
                                 width={200}
                                 height={200}
                                 quality={100}
                                 draggable={false}
                              />
                           </div>

                           <div className="skin__info">
                              <span className="font skin__name">★ Special Item! ★</span>
                           </div>

                           <div className="skin__rarity">
                              <div className="line" style={{ background: "rgb(255, 215, 0)" }}></div>
                           </div>
                        </div>
                     ) : null
                  }
               </div>
            </div>
         </div >
      </div >
   )
}
